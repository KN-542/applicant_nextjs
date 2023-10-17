import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useTranslations } from 'next-intl'
import { visuallyHidden } from '@mui/utils'
import { TableHeader } from '@/types/management'
import { every, isEmpty, keys, map, size } from 'lodash'
import { common } from '@material-ui/core/colors'

type Props = {
  headers: TableHeader[]
  bodies: Record<string, any>[]
  isCheckbox?: boolean
}

// 並び替え機能(Generics型で定義)
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  rowCount: number
  headers: TableHeader[]
  isCheckbox?: boolean
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, headers, isCheckbox } = props

  return (
    <TableHead>
      <TableRow>
        {isCheckbox && (
          <>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: common.black,
                color: common.white,
                padding: 0.5,
              }}
            ></TableCell>
          </>
        )}
        {headers.map((header) => (
          <TableCell
            key={header.id}
            align="left"
            padding="none"
            sortDirection={
              header.sort ? (header.sort.isAsc ? 'asc' : 'desc') : false
            }
            sx={{ bgcolor: common.black, color: common.white }}
          >
            <TableSortLabel
              active={header.sort ? header.sort.target : false}
              direction={
                header.sort ? (header.sort.isAsc ? 'asc' : 'desc') : 'asc'
              }
            >
              {header.name}
              {/* {every([header.sort, header.sort.target]) ? (
                <Box component="span" sx={visuallyHidden}>
                  {!header.sort.isAsc
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function EnhancedTable(props: Props) {
  const t = useTranslations()

  const [order, setOrder] = React.useState<Order>('asc')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)

  const handleRequestSort = () => {}

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {}

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - size(props.bodies)) : 0

  return (
    <Box sx={{ width: '90%', m: '0 auto' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={size(props.bodies)}
              headers={props.headers}
              isCheckbox={props.isCheckbox}
            />
            <TableBody>
              {stableSort(props.bodies, getComparator(order, 'orderBy'))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.name))
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, String(row.name))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      {props.isCheckbox && (
                        <>
                          <TableCell padding="checkbox" sx={{ height: 75 }}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell padding="none"></TableCell>
                        </>
                      )}
                      {map(keys(row), (item, index2) => {
                        return (
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            key={index2}
                            sx={{ height: 75 }}
                          >
                            {isEmpty(row.item) && row[item]}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 200, 300]}
          component="div"
          count={size(props.bodies)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('common.table.rowsPerPage')}
        />
      </Paper>
    </Box>
  )
}

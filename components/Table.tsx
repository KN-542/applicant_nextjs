import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/hooks/store/store'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useTranslations } from 'next-intl'
import { TableHeader } from '@/types/management'
import { isEmpty, isEqual, keys, map, size } from 'lodash'
import { common } from '@material-ui/core/colors'

type Props = {
  headers: TableHeader[]
  bodies: Record<string, any>[]
  isCheckbox?: boolean
}

type EnhancedTableProps = {
  numSelected: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  rowCount: number
  headers: TableHeader[]
  isCheckbox?: boolean
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const setting = useSelector((state: RootState) => state.management.setting)

  return (
    <TableHead>
      <TableRow>
        {props.isCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="default"
              indeterminate={props.numSelected < props.rowCount}
              checked={isEqual(props.numSelected, props.rowCount)}
              onChange={props.onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        <TableCell
          sx={{
            backgroundColor: setting.color,
            color: common.white,
            padding: 0.5,
          }}
        ></TableCell>
        {props.headers.map((header) => (
          <TableCell
            key={header.id}
            align="left"
            padding="none"
            sortDirection={
              header.sort ? (header.sort.isAsc ? 'asc' : 'desc') : false
            }
            sx={{ bgcolor: setting.color, color: common.white }}
          >
            {header.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTable = (props: Props) => {
  const t = useTranslations()

  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(40)

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {}

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

  return (
    <Box sx={{ width: '90%', m: '0 auto' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={size(selected)}
              onSelectAllClick={handleSelectAllClick}
              rowCount={size(props.bodies)}
              headers={props.headers}
              isCheckbox={props.isCheckbox}
            />
            <TableBody>
              {props.bodies.map((row, index) => {
                const isItemSelected = isSelected(String(row.name))

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    {props.isCheckbox && (
                      <TableCell padding="checkbox" sx={{ height: 75 }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell padding="none"></TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[40, 200, 300]}
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

export default EnhancedTable

import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/hooks/store/store'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useTranslations } from 'next-intl'
import { TableHeader } from '@/types/management'
import { isEmpty, isEqual, keys, map, size } from 'lodash'
import {
  Cell,
  ColorWhite,
  M0Auto,
  mb,
  minW,
  mt,
  TableHeaderSX,
  TextCenter,
  hBlock,
  w,
} from '@/styles/index'
import { common } from '@mui/material/colors'

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
    <TableHead sx={TableHeaderSX}>
      <TableRow>
        {props.isCheckbox && (
          <TableCell
            sx={[
              Cell,
              {
                backgroundColor: setting.color,
              },
            ]}
          ></TableCell>
        )}
        <TableCell
          sx={[
            Cell,
            {
              backgroundColor: setting.color,
            },
          ]}
        ></TableCell>
        {props.headers.map((header) => (
          <TableCell
            key={header.id}
            align="left"
            padding="none"
            sortDirection={
              header.sort ? (header.sort.isAsc ? 'asc' : 'desc') : false
            }
            sx={[ColorWhite, { bgcolor: setting.color }]}
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
  const setting = useSelector((state: RootState) => state.management.setting)

  const [selected, setSelected] = React.useState<readonly string[]>([])

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {}

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  return (
    <>
      {size(props.bodies) > 0 && (
        <Box sx={[w(90), M0Auto]}>
          <Paper sx={[mb(2)]}>
            <TableContainer sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
              <Table sx={minW(750)} aria-labelledby="tableTitle" size="medium">
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
                          <TableCell
                            padding="checkbox"
                            sx={[
                              hBlock(75),
                              ColorWhite,
                              { bgcolor: common.white },
                            ]}
                          >
                            <Checkbox
                              style={{ color: setting.color }}
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
                              sx={hBlock(75)}
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
          </Paper>
        </Box>
      )}
      {isEqual(size(props.bodies), 0) && (
        <Box fontSize={60} sx={[TextCenter, mt(30)]}>
          {t('common.table.none')}
        </Box>
      )}
    </>
  )
}

export default EnhancedTable

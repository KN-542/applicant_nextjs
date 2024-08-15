import { blue, common } from '@mui/material/colors'
import _ from 'lodash'

export const m = (m: number) => {
  return { m: m }
}
export const mt = (mt: number) => {
  return { mt: mt }
}
export const mr = (mr: number) => {
  return { mr: mr }
}
export const mb = (mb: number) => {
  return { mb: mb }
}
export const ml = (ml: number) => {
  return { ml: ml }
}

export const M0Auto = { m: '0 auto' }

export const w = (w: number) => {
  return { width: `${w}%` }
}
export const wBlock = (w: number) => {
  return { width: w }
}
export const minW = (w: number) => {
  return { minWidth: w }
}
export const hBlock = (h: number) => {
  return { height: h }
}
export const Color = (c: string) => {
  return { color: c }
}
export const BackGroundColor = (c: string) => {
  return { backgroundColor: c }
}

export const ErrorDisp = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}

export const Top = {
  position: 'fixed',
  zIndex: 1,
  top: 0,
  width: '100%',
  backgroundColor: blue[500],
  color: common.white,
  p: 2,
}

export const TopMenu = {
  display: 'flex',
  alignItems: 'center',
}

export const Title = {
  fontSize: 30,
  fontWeight: 'bold',
}

export const SubTitle = {
  display: 'flex',
  m: '0 auto',
  fontSize: 25,
  fontWeight: 'bold',
  borderBottom: '2px solid',
}

export const SubTitleMsg = {
  display: 'flex',
  flexDirection: 'column',
  m: '0 auto',
  width: '90%',
}

export const modalContent = {
  display: 'flex',
  width: '90%',
  m: '0 auto',
  flexDirection: 'column',
}

export const TextCenter = {
  textAlign: 'center',
}

export const FlexGrow = { flexGrow: 1 }

export const SpaceBetween = { display: 'flex', justifyContent: 'space-between' }

export const SpaceBetweenContent = {
  display: 'none',
  '@media (min-width:950px)': {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export const ToolBarMlMedia = {
  '@media (min-width:950px)': {
    ml: 15,
  },
}

export const ColorRed = { color: 'red' }
export const ColorWhite = { color: common.white }

export const Bold = {
  fontWeight: 'bold',
}

export const DragDropArea = {
  m: '0 auto',
  width: '90%',
  mt: 3,
  mb: 3,
  border: '2px dashed #ccc',
  backgroundColor: '#eee',
  color: '#bbb',
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  bgcolor: common.white,
}

export const LogoutButton = {
  display: 'flex',
  m: '0 auto',
  minHeight: 48,
  minWidth: 190,
  width: '10%',
  mb: 10,
  mt: 2,
}

export const confirmButton = {
  display: 'flex',
  m: '0 auto',
  minHeight: 48,
  minWidth: 190,
  width: '10%',
  mb: 10,
  mt: 2,
  bgcolor: blue[500],
  '&:hover': { bgcolor: blue[500] },
}

export const LoginMain = {
  mt: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const DialogContentMain = {
  backgroundColor: common.white,
  margin: '0 auto',
  boxShadow: '0 4px 8px',
  p: 3,
  borderRadius: 20,
}

export const FormBox = {
  mt: 8,
  display: 'flex',
  flexFlow: 'column',
}

export const FormButtons = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '90%',
  m: '0 auto',
  alignItems: 'center',
  gap: '16px',
  mt: 3,
  flexWrap: 'wrap',
  '@media (min-width:950px)': {
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'space-between',
  },
}

export const FormContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  '@media (min-width:950px)': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '> *': {
    flex: '1',
    ml: 1,
    mr: 1,
  },
}

export const FileDisp = {
  borderBottom: '1px solid',
  borderColor: blue[300],
  color: blue[300],
}

export const TableTop = {
  position: 'relative',
  zIndex: 0,
  m: '0 auto',
}

export const TableCon = {
  overflow: 'auto',
  mt: 4,
  maxHeight: 500,
}

export const Table0_0 = {
  position: 'sticky',
  left: 0,
  zIndex: 3,
}

export const TableBodyCell = {
  position: 'sticky',
  left: 0,
  zIndex: 1,
}

export const TableCellColor = {
  backgroundColor: blue[500],
  color: common.white,
}

export const ButtonColor = (color: string, bgColor: string) => {
  return {
    color: _.isEmpty(color) ? '' : color,
    backgroundColor: _.isEmpty(bgColor) ? '' : bgColor,
    '&:hover': {
      color: _.isEmpty(color) ? '' : color,
      backgroundColor: _.isEmpty(bgColor) ? '' : bgColor,
    },
  }
}

export const SpaceEvenly = { display: 'flex', justifyContent: 'space-evenly' }

export const ModalResponsive = {
  borderRadius: '50px',
  '@media (min-width:1100px)': {
    m: 10,
  },
}

import { blue, common, indigo } from '@mui/material/colors'

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

export const ErrorDisp = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}

export const Title = {
  position: 'fixed',
  zIndex: 1,
  top: 0,
  width: '100%',
  textAlign: 'center',
  fontSize: 40,
  fontWeight: 'bold',
  backgroundColor: indigo[500],
  color: common.white,
  p: 3,
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
export const SecondaryMain = { bgcolor: 'secondary.main' }

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

export const confirmButton = {
  display: 'flex',
  m: '0 auto',
  minHeight: 48,
  minWidth: 190,
  width: '10%',
  mb: 10,
  mt: 2,
  bgcolor: indigo[500],
  '&:hover': { bgcolor: indigo[500] },
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

export const FormRadio = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
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

export const TableMenu = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '90%',
  m: '0 auto',
  mb: 3,
}

export const Resume = {
  textTransform: 'none',
}

export const ColorBox = {
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const ColorBoxChild = { display: 'flex', flexWrap: 'wrap', gap: 2 }
export const ColorBoxChildNowrap = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 2,
}
export const ColorButton = {
  width: 100,
  height: 100,
  color: common.white,
  textTransform: 'none',
}

export const DialogKey = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 5,
}
export const DialogKeyChild = {
  width: '20%',
  fontWeight: 'bold',
  fontSize: 20,
  padding: 2,
}
export const DialogValue = {
  width: '90%',
  textAlign: 'center',
  fontSize: 20,
  padding: 2,
}

export const SideBarName = {
  textDecoration: 'none',
  color: 'grey',
  ml: 4,
}
export const SideBarBody = {
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}

export const Cell = { color: common.white, padding: 0.5 }

export const TableHeaderSX = { position: 'sticky', top: 0, height: 48 }

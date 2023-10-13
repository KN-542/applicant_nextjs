import { useSelector } from 'react-redux'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from '@material-ui/core'
import { Button } from '@mui/material'
import { useTranslations } from 'next-intl'
import store, { RootState } from '@/hooks/store/store'
import { mgSignOut } from '@/hooks/store'
import router from 'next/router'

type Props = {
  onToggleDrawer: () => void
}

const ToolBar = (props: Props) => {
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)

  const logout = async () => {
    // TODO API
    store.dispatch(mgSignOut())
    router.push('/management/login')
  }

  return (
    <AppBar position="static" color="primary">
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            aria-label="menu-button"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="inherit" onClick={logout}>
              {t('management.toolbar.logout')}
            </Button>
            <Image
              src="/logo.png"
              alt="CLINKS logo"
              width={100}
              height={24}
              style={{ marginLeft: '2rem' }}
              priority
            />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default ToolBar

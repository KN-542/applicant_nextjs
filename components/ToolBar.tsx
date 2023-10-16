import { useSelector } from 'react-redux'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from '@material-ui/core'
import { Button, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import store, { RootState } from '@/hooks/store/store'
import { mgSignOut } from '@/hooks/store'
import router from 'next/router'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { RouterPath, decideTitle } from '@/enum/router'

type Props = {
  onToggleDrawer: () => void
}

const ToolBar = (props: Props) => {
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)

  const logout = async () => {
    // TODO API
    store.dispatch(mgSignOut())
    router.push(RouterPath.ManagementLogin)
  }

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ position: 'fixed', top: 0 }}
    >
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
          <Typography variant="h6" sx={{ ml: 15 }}>
            {t(decideTitle(router.pathname))}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ mr: 1 }}
              color="inherit"
              onClick={(e) => {
                e.preventDefault()
                router.push(RouterPath.ManagementSetting)
              }}
            >
              <SettingsIcon sx={{ mr: 0.25 }} />
              {t('management.toolbar.setting')}
            </Button>
            <Button
              color="inherit"
              onClick={async (e) => {
                e.preventDefault()
                await logout()
              }}
            >
              <LogoutIcon sx={{ mr: 0.25 }} />
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

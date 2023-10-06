import Image from 'next/image'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from '@material-ui/core'
import { Button } from '@mui/material'
import { useTranslations } from 'next-intl'

type Props = {
  onToggleDrawer: () => void
}

const ToolBar = (props: Props) => {
  const t = useTranslations()

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
          <Typography variant="h6">News</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="inherit">{t('management.toolbar.logout')}</Button>
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

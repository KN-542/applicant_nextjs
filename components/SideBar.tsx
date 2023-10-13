import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  List,
  Drawer,
  ListItem,
  ListItemButton,
  Divider,
  Box,
  Button,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import MailIcon from '@mui/icons-material/Mail'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import HistoryIcon from '@mui/icons-material/History'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { SideBarModel, SideBarStoreModel } from 'types/management'
import { indigo } from '@mui/material/colors'
import { useTranslations } from 'next-intl'
import store, { RootState } from '@/hooks/store/store'
import _ from 'lodash'
import { mgSideBarChange, mgSignOut } from '@/hooks/store'

type Props = {
  drawerOpen: boolean
  onToggleDrawer: () => void
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)

  const data: SideBarModel[] = [
    {
      id: 1,
      name: t('management.sidebar.applicant'),
      href: '/management/admin/applicant',
      icon: <PersonIcon />,
    },
    {
      id: 2,
      name: t('management.sidebar.reserver'),
      href: '/management/admin/reserver',
      icon: <CalendarMonthIcon />,
    },
    {
      id: 3,
      name: t('management.sidebar.interviewer'),
      href: '/management/admin/interviewer',
      icon: <CoPresentIcon />,
    },
    {
      id: 4,
      name: t('management.sidebar.mail'),
      href: '/management/admin/mail',
      icon: <MailIcon />,
    },
    {
      id: 5,
      name: t('management.sidebar.analysis'),
      href: '/management/admin/analysis',
      icon: <EqualizerIcon />,
    },
    {
      id: 6,
      name: t('management.sidebar.history'),
      href: '/management/admin/history',
      icon: <HistoryIcon />,
    },
  ]
  const subData: SideBarModel[] = [
    {
      id: 7,
      name: t('management.sidebar.setting'),
      href: '/management/admin/setting',
      icon: <SettingsIcon />,
    },
    {
      id: 8,
      name: t('management.sidebar.logout'),
      href: '',
      icon: <LogoutIcon />,
      button: async () => {
        // TODO API
        store.dispatch(mgSignOut())
        router.push('/management/login')
      },
    },
  ]

  const sideEvent = (row: SideBarModel) => {
    store.dispatch(
      mgSideBarChange({
        targetId: row.id,
        targetName: row.name,
      } as SideBarStoreModel),
    )
    router.push(row.href)
  }

  const renderRow = (row: SideBarModel): JSX.Element => {
    return (
      <ListItem disablePadding key={row.name} sx={{ mt: '1rem', mb: '1rem' }}>
        <ListItemButton
          onClick={
            row.button
              ? row.button
              : (e) => {
                  e.preventDefault()
                  sideEvent(row)
                }
          }
        >
          {row.icon}
          <Box
            sx={{
              textDecoration: 'none',
              color: 'grey',
              ml: '2rem',
            }}
          >
            {row.name}
          </Box>
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
    >
      <Box
        sx={{ width: '250px' }}
        role="presentation"
        onClick={props.onToggleDrawer}
      >
        <Box
          sx={{
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1em',
            backgroundColor: indigo[500],
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
          }}
        >
          <IconButton
            aria-label="menu-button"
            size="large"
            color="inherit"
            onClick={props.onToggleDrawer}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <p color="inherit">{user.name}</p>
        </Box>

        <List>{data.map((row) => renderRow(row))}</List>

        <Divider />

        <List>{subData.map((row) => renderRow(row))}</List>
      </Box>
    </Drawer>
  )
}

export default SideBar

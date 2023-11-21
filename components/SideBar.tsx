import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  List,
  Drawer,
  ListItem,
  ListItemButton,
  Divider,
  Box,
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
import { useTranslations } from 'next-intl'
import store, { RootState } from '@/hooks/store/store'
import _, { isEqual } from 'lodash'
import { mgSideBarChange, mgSignOut } from '@/hooks/store'
import { RouterPath } from '@/enum/router'
import { mb, mt, SideBarBody, SideBarName, wBlock } from '@/styles/index'
import { HashKeyRequest } from '@/api/model/management'
import { Role } from '@/enum/user'

type Props = {
  drawerOpen: boolean
  onToggleDrawer: () => void
  logout: (req: HashKeyRequest) => void
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)
  const setting = useSelector((state: RootState) => state.management.setting)

  const data: SideBarModel[] = [
    {
      id: 1,
      name: t('sidebar.applicant'),
      href: RouterPath.Applicant,
      icon: <PersonIcon />,
      role: true,
    },
    {
      id: 2,
      name: t('sidebar.reserver'),
      href: RouterPath.Reserver,
      icon: <CalendarMonthIcon />,
      role: true,
    },
    {
      id: 3,
      name: t('sidebar.user'),
      href: RouterPath.User,
      icon: <CoPresentIcon />,
      role: true,
    },
    {
      id: 4,
      name: t('sidebar.mail'),
      href: RouterPath.MailTemplate,
      icon: <MailIcon />,
      role: isEqual(user.role, Role.Admin),
    },
    {
      id: 5,
      name: t('sidebar.analysis'),
      href: RouterPath.Analysis,
      icon: <EqualizerIcon />,
      role: isEqual(user.role, Role.Admin),
    },
    {
      id: 6,
      name: t('sidebar.history'),
      href: RouterPath.History,
      icon: <HistoryIcon />,
      role: isEqual(user.role, Role.Admin),
    },
  ]
  const subData: SideBarModel[] = [
    {
      id: 7,
      name: t('sidebar.setting'),
      href: RouterPath.Setting,
      icon: <SettingsIcon />,
      role: true,
    },
    {
      id: 8,
      name: t('sidebar.logout'),
      href: '',
      icon: <LogoutIcon />,
      role: true,
      button: async () => {
        await props.logout({
          hash_key: user.hashKey,
        } as HashKeyRequest)
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
      <>
        {row.role && (
          <ListItem disablePadding key={row.name} sx={[mt(2), mb(2)]}>
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
              <Box sx={SideBarName}>{row.name}</Box>
            </ListItemButton>
          </ListItem>
        )}
      </>
    )
  }

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
    >
      <Box sx={wBlock(300)} role="presentation" onClick={props.onToggleDrawer}>
        <Box
          sx={[
            SideBarBody,
            {
              backgroundColor: setting.color,
            },
          ]}
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

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
import { SideBarModel, SideBarStore } from 'types/management'
import { indigo } from '@mui/material/colors'
import { useTranslations } from 'next-intl'
import store, { RootState } from '@/hooks/store/store'
import _ from 'lodash'
import { mgSideBarChange } from '@/hooks/store'

type Props = {
  drawerOpen: boolean
  onToggleDrawer: () => void
}

const SideBar = (props: Props) => {
  const router = useRouter()
  const t = useTranslations()

  const target = useSelector((state: RootState) => state.management.sidebar)

  const data: SideBarModel[] = [
    {
      id: 1,
      name: t('management.sidebar.applicant'),
      href: '/management/admin/applicant',
      target: false,
      icon: <PersonIcon />,
    },
    {
      id: 2,
      name: t('management.sidebar.reserver'),
      href: '/management/admin/reserver',
      target: false,
      icon: <CalendarMonthIcon />,
    },
    {
      id: 3,
      name: t('management.sidebar.interviewer'),
      href: '/management/admin/interviewer',
      target: false,
      icon: <CoPresentIcon />,
    },
    {
      id: 4,
      name: t('management.sidebar.mail'),
      href: '/management/admin/mail',
      target: false,
      icon: <MailIcon />,
    },
    {
      id: 5,
      name: t('management.sidebar.analysis'),
      href: '/management/admin/analysis',
      target: false,
      icon: <EqualizerIcon />,
    },
    {
      id: 6,
      name: t('management.sidebar.history'),
      href: '/management/admin/history',
      target: false,
      icon: <HistoryIcon />,
    },
  ]
  for (const d of data) {
    d.target = _.isEqual(d.id, target.targetId)
  }
  if (_.isEmpty(_.filter(data, (d) => d.target))) data[0].target = true

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
          <p color="inherit">ユーザー名</p>
        </Box>

        <List>
          {data.map((row) => {
            return (
              <ListItem
                disablePadding
                key={row.name}
                sx={{ mt: '1rem', mb: '1rem' }}
              >
                <ListItemButton>
                  {row.icon}
                  <Button
                    sx={{
                      textDecoration: 'none',
                      color: 'grey',
                      ml: '2rem',
                    }}
                    onClick={(e) => {
                      e.preventDefault()

                      for (const r of data) {
                        r.target = false
                      }
                      row.target = true
                      store.dispatch(
                        mgSideBarChange({
                          targetId: row.id,
                          targetName: row.name,
                        } as SideBarStore),
                      )
                      router.push(row.href)
                    }}
                  >
                    {row.name}
                  </Button>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Divider />
      </Box>
    </Drawer>
  )
}

export default SideBar

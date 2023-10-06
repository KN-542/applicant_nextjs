import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
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
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import { SideBarModel } from 'types/management'
import { indigo } from '@mui/material/colors'
import { useTranslations } from 'next-intl'

type Props = {
  drawerOpen: boolean
  onToggleDrawer: () => void
}

const DrawerList = styled('div')(() => ({
  width: 250,
}))

const SideBar = (props: Props) => {
  const router = useRouter()
  const t = useTranslations()

  const data: SideBarModel[] = [
    {
      name: t('management.sidebar.applicant'),
      href: '/management/admin/applicant',
      target: true,
      icon: <PersonIcon />,
    },
    {
      name: t('management.sidebar.reserver'),
      href: '/management/admin/reserver',
      target: false,
      icon: <CalendarMonthIcon />,
    },
    {
      name: t('management.sidebar.interviewer'),
      href: '/management/admin/interviewer',
      target: false,
      icon: <CoPresentIcon />,
    },
    {
      name: t('management.sidebar.mail'),
      href: '/management/admin/mail',
      target: false,
      icon: <MailIcon />,
    },
    {
      name: t('management.sidebar.analysis'),
      href: '/management/admin/analysis',
      target: false,
      icon: <EqualizerIcon />,
    },
    {
      name: t('management.sidebar.history'),
      href: '/management/admin/history',
      target: false,
      icon: <HistoryIcon />,
    },
  ]

  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
    >
      <DrawerList role="presentation" onClick={props.onToggleDrawer}>
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
      </DrawerList>
    </Drawer>
  )
}

export default SideBar

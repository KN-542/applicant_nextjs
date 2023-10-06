import Link from 'next/link'
import Image from 'next/image'
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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import { SideBarModel } from 'types/management'
import { indigo } from '@mui/material/colors'

type Props = {
  drawerOpen: boolean
  onToggleDrawer: () => void
  locales: string[]
  data: SideBarModel[]
}

const DrawerList = styled('div')(() => ({
  width: 250,
}))

const SideBar = (props: Props) => {
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
          {/* <IconButton
            aria-label="menu-button"
            size="large"
            color="inherit"
            onClick={props.onToggleDrawer}
          >
            <Avatar sx={{ bgcolor: 'inherit.main' }}> */}
          {/* <AccountCircleIcon fontSize="large" sx={{ mb: '1rem' }} /> */}
          {/* </Avatar>
          </IconButton> */}
          <Image
            src="/logo.png"
            alt="Vercel Logo"
            width={200}
            height={48}
            priority
          />
        </Box>

        <List>
          {props.data.map((row) => {
            return (
              <ListItem
                disablePadding
                key={row.name}
                sx={{ mt: '1rem', mb: '1rem' }}
              >
                <ListItemButton>
                  {row.icon}
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'grey',
                      marginLeft: '2rem',
                    }}
                    href={row.href}
                  >
                    {row.name}
                  </Link>
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

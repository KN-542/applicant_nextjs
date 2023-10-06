import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SideBar from '@/components/SideBar'
import '@/styles/globals.css'
import _ from 'lodash'
import { appWithTranslation, i18n } from 'next-i18next'
import ToolBar from '@/components/ToolBar'
import { useTranslation } from 'react-i18next'
import { Language, SideBarModel } from 'types/management'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import MailIcon from '@mui/icons-material/Mail'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import HistoryIcon from '@mui/icons-material/History'

const App = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   i18n.changeLanguage('ja') // 初期言語を設定
  // }, [])
  const router = useRouter()
  const { t } = useTranslation('common')

  // management/admin 配下の場合
  if (_.includes(router.pathname, 'management/admin')) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const sideData: SideBarModel[] = [
      {
        name: t('management.sidebar.applicant'),
        href: '/management/admin/applicant',
        icon: <PersonIcon />,
      },
      {
        name: t('management.sidebar.reserver'),
        href: '/management/admin/reserver',
        icon: <CalendarMonthIcon />,
      },
      {
        name: t('management.sidebar.interviewer'),
        href: '/management/admin/interviewer',
        icon: <CoPresentIcon />,
      },
      {
        name: t('management.sidebar.mail'),
        href: '/management/admin/mail',
        icon: <MailIcon />,
      },
      {
        name: t('management.sidebar.analysis'),
        href: '/management/admin/analysis',
        icon: <EqualizerIcon />,
      },
      {
        name: t('management.sidebar.history'),
        href: '/management/admin/history',
        icon: <HistoryIcon />,
      },
    ]

    const toolBarData: SideBarModel[] = [
      {
        name: t('management.sidebar.setting'),
        href: '/management/admin/setting',
        icon: <PersonIcon />,
      },
      {
        name: t('management.sidebar.logout'),
        href: '/management/login',
        icon: <CalendarMonthIcon />,
      },
    ]

    const toolbarLocales: Language = {
      logout: t('management.toolbar.logout'),
    }

    return (
      <>
        <ToolBar
          locales={toolbarLocales}
          onToggleDrawer={() => {
            setDrawerOpen((b) => !b)
          }}
        />
        <SideBar
          drawerOpen={drawerOpen}
          onToggleDrawer={() => {
            setDrawerOpen((b) => !b)
          }}
          locales={[]}
          data={sideData}
        />
        <Component {...pageProps} />
      </>
    )
  } else {
    return <Component {...pageProps} />
  }
}

export default appWithTranslation(App)

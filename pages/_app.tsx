import { useState } from 'react'
import { useRouter } from 'next/router'
import SideBar from '@/components/SideBar'
import '@/styles/globals.css'
import _ from 'lodash'
import { appWithTranslation } from 'next-i18next'
import ToolBar from '@/components/ToolBar'
import { NextIntlClientProvider } from 'next-intl'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  // management/admin 配下の場合
  if (_.includes(router.pathname, 'management/admin')) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
      <NextIntlClientProvider messages={pageProps.messages}>
        <ToolBar
          onToggleDrawer={() => {
            setDrawerOpen((b) => !b)
          }}
        />
        <SideBar
          drawerOpen={drawerOpen}
          onToggleDrawer={() => {
            setDrawerOpen((b) => !b)
          }}
        />
        <Component {...pageProps} />
      </NextIntlClientProvider>
    )
  } else {
    return (
      <NextIntlClientProvider messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlClientProvider>
    )
  }
}

export default appWithTranslation(App)

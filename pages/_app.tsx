import { useState } from 'react'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import SideBar from '@/components/SideBar'
import '@/styles/index.css'
import _ from 'lodash'
import { appWithTranslation } from 'next-i18next'
import ToolBar from '@/components/ToolBar'
import { NextIntlClientProvider } from 'next-intl'
import store from '@/hooks/store/store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  // management/admin 配下の場合
  if (_.includes(router.pathname, 'management/admin')) {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
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
            <ToastContainer />
          </NextIntlClientProvider>
        </PersistGate>
      </Provider>
    )
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <NextIntlClientProvider messages={pageProps.messages}>
            <Component {...pageProps} />
            <ToastContainer />
          </NextIntlClientProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default appWithTranslation(App)

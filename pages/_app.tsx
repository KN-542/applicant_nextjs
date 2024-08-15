import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '@/styles/index.css'
import _ from 'lodash'
import { appWithTranslation } from 'next-i18next'
import { NextIntlClientProvider } from 'next-intl'
import store from '@/hooks/store/store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { RouterPath } from '@/enum/router'
import Admin from '@/components/Admin'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  if (
    _.some([
      _.isEqual(router.pathname, RouterPath.NotFound),
      router.pathname.startsWith(RouterPath.Login.replace('[id]', '')),
      _.isEqual(router.pathname, RouterPath.Error),
    ])
  ) {
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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <NextIntlClientProvider messages={pageProps.messages}>
          <Admin Component={Component} pageProps={pageProps} />
        </NextIntlClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default appWithTranslation(App)

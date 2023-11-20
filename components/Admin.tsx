// components/Admin.js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ToolBar from '@/components/ToolBar'
import SideBar from '@/components/SideBar'
import store, { RootState } from '@/hooks/store/store'
import { JWTDecodeCSR, LogoutCSR } from '@/api/repository'
import { RouterPath } from '@/enum/router'
import { MFAStatus } from '@/enum/login'
import { APICommonCode, APISessionCheckCode } from '@/enum/apiError'
import _, { every, isEqual } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { HashKeyRequest } from '@/api/model/management'
import { mgChangeSetting } from '@/hooks/store'
import { SettingModel } from '@/types/management'
import { useTranslations } from 'next-intl'

const Admin = ({ Component, pageProps, logout }) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)

  const [disp, setDisp] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    // JWT検証
    JWTDecodeCSR({
      hash_key: user.hashKey,
    } as HashKeyRequest)
      .then((res) => {
        if (isEqual(res.data.mfa, MFAStatus.UnAuthenticated)) {
          router.push(RouterPath.ManagementLoginMFA)
          return
        }

        setDisp(true)
      })
      .catch((error) => {
        if (
          every([500 <= error.response.status, error.response.status < 600])
        ) {
          router.push(RouterPath.ManagementError)
          return
        }

        let msg = ''
        if (isEqual(error.response.data.code, APICommonCode.BadRequest)) {
          msg = t(`common.api.code.${error.response.data.code}`)
        } else if (
          isEqual(error.response.data.code, APISessionCheckCode.LoginRequired)
        ) {
          msg = t(`common.api.code.expired${error.response.data.code}`)
        }

        store.dispatch(
          mgChangeSetting({
            errorMsg: msg,
          } as SettingModel),
        )

        router.push(RouterPath.ManagementLogin)
        return
      })
  }, [])

  return (
    <>
      {disp && (
        <>
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
            logout={logout}
          />
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  )
}

export default Admin

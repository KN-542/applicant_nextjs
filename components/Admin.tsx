// components/Admin.js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import store, { RootState } from '@/hooks/store/store'
import { JWTDecodeCSR } from '@/api/repository'
import { RouterPath } from '@/enum/router'
import { MFAStatus } from '@/enum/login'
import { APICommonCode, APISessionCheckCode } from '@/enum/apiError'
import _, { every, isEqual } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { HashKeyRequest } from '@/api/model/index'
import { commonDispatch, userDispatch } from '@/hooks/store'
import { CommonModel, UserModel } from '@/types/index'
import { useTranslations } from 'next-intl'

const Admin = ({ Component, pageProps, logout }) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const [disp, setDisp] = useState(false)

  useEffect(() => {
    // JWT検証
    JWTDecodeCSR({
      hash_key: user.hashKey,
    } as HashKeyRequest)
      .then((res) => {
        if (isEqual(res.data.mfa, MFAStatus.UnAuthenticated)) {
          router.push(RouterPath.LoginMFA)
          return
        }

        store.dispatch(
          userDispatch({
            hashKey: res.data.hash_key,
            name: res.data.name,
            mail: res.data.email,
          } as UserModel),
        )

        setDisp(true)
      })
      .catch(async (error) => {
        if (
          every([500 <= error.response.status, error.response.status < 600])
        ) {
          router.push(RouterPath.Error)
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

        await logout({ hash_key: user.hashKey } as HashKeyRequest, msg)
      })
  }, [])

  return (
    <>
      {disp && (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  )
}

export default Admin

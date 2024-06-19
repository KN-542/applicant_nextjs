import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import store, { RootState } from '@/hooks/store/store'
import { JWTDecodeCSR, LogoutCSR } from '@/api/repository'
import { RouterPath } from '@/enum/router'
import { APICommonCode, APISessionCheckCode } from '@/enum/apiError'
import _, { every, isEqual } from 'lodash'
import { ToastContainer } from 'react-toastify'
import { JWTDdcodeRequest, LogoutRequest } from '@/api/model/index'
import { commonDispatch, userDispatch } from '@/hooks/store'
import { CommonModel, UserModel } from '@/types/index'
import { useTranslations } from 'next-intl'

const Admin = ({ Component, pageProps }) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const [disp, isDisp] = useState<boolean>(false)

  const logout = async (req: LogoutRequest, msg: string) => {
    await LogoutCSR(req)
      .then(() => {
        store.dispatch(
          userDispatch({
            hashKey: '',
            name: '',
            mail: '',
          } as UserModel),
        )
        store.dispatch(
          commonDispatch({
            errorMsg: msg,
          } as CommonModel),
        )
        router.push(RouterPath.Login)
      })
      .catch((error) => {
        isEqual(error.response.data.code, APICommonCode.BadRequest)
          ? router.push(RouterPath.Login)
          : router.push(RouterPath.Error)
        return
      })
  }

  useEffect(() => {
    // JWT検証
    JWTDecodeCSR({
      hash_key: user.hashKey,
    } as JWTDdcodeRequest)
      .then(() => {
        isDisp(true)
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

        store.dispatch(
          commonDispatch({
            errorMsg: msg,
          } as CommonModel),
        )

        await logout({ hash_key: user.hashKey } as LogoutRequest, msg)
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

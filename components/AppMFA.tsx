import { MFACreateCSR } from '@/api/repository'
import store, { RootState } from '@/hooks/store/store'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { HashKeyRequest } from '@/api/model/management'
import { every, isEqual } from 'lodash'
import { RouterPath } from '@/enum/router'
import { APICommonCode, APISessionCheckCode } from '@/enum/apiError'
import { mgChangeSetting } from '@/hooks/store'
import { SettingModel } from '@/types/management'

const AppMFA = ({ Component, pageProps, logout }) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)

  const [disp, setDisp] = useState(false)

  useEffect(() => {
    MFACreateCSR({
      hash_key: user.hashKey,
    } as HashKeyRequest)
      .then(() => {
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
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  )
}

export default AppMFA

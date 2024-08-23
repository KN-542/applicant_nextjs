import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import store, { RootState } from '@/hooks/store/store'
import { DecodeJWTCSR } from '@/api/repository'
import { RouterPath } from '@/enum/router'
import ClearIcon from '@mui/icons-material/Clear'
import _ from 'lodash'
import { toast, ToastContainer } from 'react-toastify'
import { DecodeJWTRequest } from '@/api/model/index'
import { commonDispatch } from '@/hooks/store'
import { CommonModel } from '@/types/index'
import { useTranslations } from 'next-intl'
import { red, common } from '@mui/material/colors'

const Admin = ({ Component, pageProps }) => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const [disp, isDisp] = useState<boolean>(false)

  useEffect(() => {
    // JWT検証
    DecodeJWTCSR({
      hash_key: user.hashKey,
    } as DecodeJWTRequest)
      .then(() => {
        isDisp(true)
      })
      .catch(({ isServerError, routerPath, toastMsg, storeMsg }) => {
        if (isServerError) {
          router.push(routerPath)
          return
        }

        if (!_.isEmpty(toastMsg)) {
          toast(t(toastMsg), {
            style: {
              backgroundColor: red[500],
              color: common.white,
              width: 500,
            },
            position: 'bottom-left',
            hideProgressBar: true,
            closeButton: () => <ClearIcon />,
          })
          return
        }

        if (!_.isEmpty(storeMsg)) {
          const msg = t(storeMsg)
          store.dispatch(
            commonDispatch({
              errorMsg: msg,
            } as CommonModel),
          )
          router.push(_.isEmpty(routerPath) ? RouterPath.Login : routerPath)
        }
      })
  }, [router.pathname])

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

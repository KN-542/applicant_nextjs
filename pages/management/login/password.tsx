import { HashKeyRequest } from '@/api/model/management'
import { SessionConfirmCSR } from '@/api/repository'
import NextHead from '@/components/Header'
import PasswordChangeContent, {
  InputsPassword,
} from '@/components/PasswordChangeContent'
import { APICommonCode, APISessionCheckCode } from '@/enum/apiError'
import { RouterPath } from '@/enum/router'
import { RootState } from '@/hooks/store/store'
import { common } from '@mui/material/colors'
import { every, isEqual } from 'lodash'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'

const Password = ({ baseUrl }) => {
  const router = useRouter()
  const t = useTranslations()

  const setting = useSelector((state: RootState) => state.management.setting)
  const user = useSelector((state: RootState) => state.management.user)

  useEffect(() => {
    SessionConfirmCSR(baseUrl, {
      hash_key: user.hashKey,
    } as HashKeyRequest).catch((error) => {
      if (every([500 <= error.response.status, error.response.status < 600])) {
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

      toast(msg, {
        style: {
          backgroundColor: setting.toastErrorColor,
          color: common.white,
          width: 500,
        },
        position: 'bottom-left',
        hideProgressBar: true,
        closeButton: () => <ClearIcon />,
      })

      if (
        isEqual(error.response.data.code, APISessionCheckCode.LoginRequired)
      ) {
        router.push(RouterPath.ManagementLogin)
        return
      }
    })
  }, [])

  const back = () => {
    router.push(RouterPath.ManagementLogin)
  }

  const submit = async (inputs: InputsPassword) => {
    if (!isEqual(inputs.newPassword, inputs.newPasswordConfirm)) {
      toast(t('management.features.login.newPasswordMsg'), {
        style: {
          backgroundColor: setting.toastErrorColor,
          color: common.white,
          width: 600,
        },
        position: 'bottom-left',
        hideProgressBar: true,
        closeButton: () => <ClearIcon />,
      })
      return
    }
    router.push(RouterPath.ManagementApplicant)
  }

  return (
    <>
      <NextHead></NextHead>
      <PasswordChangeContent
        msg={t('management.features.login.passwordChangeMsg')}
        buttonMsg="back"
        buttonFunc={back}
        asyncFunc={submit}
      ></PasswordChangeContent>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      baseUrl: process.env.NEXT_CSR_URL,
      messages: (await import(`../../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Password

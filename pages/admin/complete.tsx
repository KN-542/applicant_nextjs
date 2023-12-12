import NextHead from '@/components/Header'
import { RouterPath } from '@/enum/router'
import store, { RootState } from '@/hooks/store/store'
import { useSelector } from 'react-redux'
import {
  ButtonColor,
  ErrorDisp,
  FormButtons,
  SubTitle,
  SubTitleMsg,
  Title,
  mb,
  minW,
  mt,
  w,
} from '@/styles/index'
import { Box, Button, Typography } from '@mui/material'
import { common, indigo } from '@mui/material/colors'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { LogoutCSR } from '@/api/repository'
import { HashKeyRequest } from '@/api/model'
import { commonDispatch, userDispatch } from '@/hooks/store'
import { CommonModel, UserModel } from '@/types/index'
import { isEqual } from 'lodash'
import { APICommonCode } from '@/enum/apiError'

const Complete = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const logout = async () => {
    await LogoutCSR({ hash_key: user.hashKey } as HashKeyRequest)
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
            errorMsg: '',
          } as CommonModel),
        )
      })
      .catch((error) => {
        isEqual(error.response.data.code, APICommonCode.BadRequest)
          ? router.push(RouterPath.Login)
          : router.push(RouterPath.Error)
        return
      })
  }

  return (
    <>
      <NextHead></NextHead>

      <Typography component="h3" variant="h5" sx={Title}>
        {t('features.main.title')}
      </Typography>

      <Typography
        component="h3"
        variant="h5"
        sx={[SubTitle, w(90), mb(2), mt(30)]}
      >
        {t('features.main.complete')}
      </Typography>
      <Box sx={[SubTitleMsg, mb(5)]}>
        <p>{t('features.main.completeMsg')}</p>
        <p>{t('features.main.completeMsg2')}</p>
        <p>{t('features.main.completeMsg3')}</p>
      </Box>
      <Box sx={[FormButtons, mt(5), mb(5)]}>
        <Button
          variant="outlined"
          color="inherit"
          sx={minW(90)}
          onClick={async () => {
            await logout()
            router.push(RouterPath.Login)
          }}
        >
          {t('features.login.errorButton')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={[minW(90), ButtonColor(common.white, indigo[500])]}
          onClick={() => router.push(RouterPath.Main)}
        >
          {t('features.main.editButton')}
        </Button>
      </Box>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Complete

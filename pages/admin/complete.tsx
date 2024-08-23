import NextHead from '@/components/Header'
import { RouterPath } from '@/enum/router'
import store, { RootState } from '@/hooks/store/store'
import { useSelector } from 'react-redux'
import {
  ButtonColor,
  FormButtons,
  SpaceBetween,
  SubTitle,
  SubTitleMsg,
  Title,
  Top,
  mb,
  minW,
  mt,
  w,
} from '@/styles/index'
import { Box, Button, Typography } from '@mui/material'
import { blue, common } from '@mui/material/colors'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { LogoutCSR } from '@/api/repository'
import { LogoutRequest } from '@/api/model'
import { commonDispatch, signOut } from '@/hooks/store'
import { CommonModel } from '@/types/index'

const Complete = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const logout = async () => {
    await LogoutCSR({ hash_key: user.hashKey } as LogoutRequest)
      .then(() => {
        store.dispatch(signOut()),
          store.dispatch(
            commonDispatch({
              errorMsg: '',
            } as CommonModel),
          )
      })
      .catch(() => {
        router.push(RouterPath.Error)
      })
  }

  return (
    <>
      <NextHead />

      <Box sx={[Top, SpaceBetween]}>
        <Box></Box>
        <Typography sx={Title}>{t('features.main.title')}</Typography>
        <Box></Box>
      </Box>

      <Typography
        component="h3"
        variant="h5"
        sx={[SubTitle, w(90), mb(2), mt(25)]}
      >
        {t('features.main.complete')}
      </Typography>
      <Box sx={[SubTitleMsg, mb(5)]}>
        <p>{t('features.main.completeMsg')}</p>
        <p>{t('features.main.completeMsg2')}</p>
        <p>{t('features.main.completeMsg3')}</p>
      </Box>
      <Box sx={[FormButtons, mt(15), mb(5)]}>
        <Button
          variant="outlined"
          color="inherit"
          sx={minW(90)}
          onClick={async () => {
            await logout()
            router.push(
              RouterPath.Login.replace('[id]', '') +
                encodeURIComponent(user.teamHashKey),
            )
          }}
        >
          {t('features.login.errorButton')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={[minW(90), ButtonColor(common.white, blue[500])]}
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

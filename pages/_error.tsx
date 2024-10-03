import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { common } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import {
  mt,
  mb,
  w,
  ErrorDisp,
  ButtonColor,
  SpaceBetweenContent,
} from '@/styles/index'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import Copyright from '@/components/Copyright'
import { RouterPath } from '@/enum/router'
import NextHead from '@/components/Header'
import { RootState } from '@/hooks/store/store'
import _ from 'lodash'

const NotFound = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <NextHead />
      <Container component="main" maxWidth="md">
        <Box sx={ErrorDisp}>
          <Typography variant="h3" component="h1" gutterBottom sx={mb(4)}>
            404 Not Found
          </Typography>
          <Typography
            component="div"
            variant="body1"
            gutterBottom
            textAlign="center"
          >
            <Box>{t('features.login.errorMsg404_1')}</Box>
            <Box>{t('features.login.errorMsg404_2')}</Box>
            <Box>{t('features.login.errorMsg404_3')}</Box>
          </Typography>
          <Box sx={[w(40), SpaceBetweenContent, mt(10), mb(6)]}>
            <Button
              variant="contained"
              sx={[ButtonColor(common.black, common.white)]}
              onClick={() => {
                if (!_.isEmpty(user.teamHashKey)) history.back()
              }}
            >
              {t('common.button.back')}
            </Button>
            <Button
              variant="contained"
              sx={[ButtonColor(common.white, common.black)]}
              onClick={() => {
                if (!_.isEmpty(user.teamHashKey))
                  router.push(
                    RouterPath.Login.replace('[id]', '') +
                      encodeURIComponent(user.teamHashKey),
                  )
              }}
            >
              {t('features.login.errorButton')}
            </Button>
          </Box>

          <Copyright sx={[mt(3)]} />
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default NotFound

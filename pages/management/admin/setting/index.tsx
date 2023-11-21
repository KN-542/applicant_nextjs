import Content from '@/components/Content'
import { mgChangeSetting } from '@/hooks/store'
import store, { RootState } from '@/hooks/store/store'
import { Color, Contents } from '@/types/management'
import { deepPurple, indigo, red } from '@material-ui/core/colors'
import { Box, Button, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RouterPath } from '@/enum/router'
import { map } from 'lodash'
import NextHead from '@/components/Header'
import {
  amber,
  blue,
  brown,
  common,
  cyan,
  deepOrange,
  green,
  grey,
  lime,
  pink,
  teal,
} from '@mui/material/colors'
import {
  ColorBox,
  ColorBoxChild,
  ColorBoxChildNowrap,
  ColorButton,
} from '@/styles/index'

const Setting = () => {
  const router = useRouter()
  const t = useTranslations()

  const setting = useSelector((state: RootState) => state.management.setting)

  const colorSet: Color[] = [
    {
      color: indigo[300],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: indigo[500],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: indigo[800],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: blue[300],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: blue[500],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: blue[800],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: deepPurple[300],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: deepPurple[500],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: deepPurple[800],
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: common.black,
      toastSuccessColor: green[500],
      toastErrorColor: red[500],
    },
    {
      color: red[300],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: red[500],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: red[800],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: deepOrange[300],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: deepOrange[500],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: deepOrange[800],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: deepOrange[900],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: pink[300],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: pink[500],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: pink[800],
      toastSuccessColor: green[500],
      toastErrorColor: common.black,
    },
    {
      color: green[300],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: green[500],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: green[800],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: cyan[300],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: cyan[500],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: cyan[800],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: teal[300],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: teal[500],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: teal[800],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: teal[900],
      toastSuccessColor: blue[500],
      toastErrorColor: red[500],
    },
    {
      color: lime[300],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: lime[500],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: lime[800],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: amber[300],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: amber[500],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: amber[800],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: brown[300],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: brown[500],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: brown[800],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: brown[900],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: grey[300],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: grey[500],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: grey[800],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
    {
      color: grey[900],
      toastSuccessColor: green[800],
      toastErrorColor: red[500],
    },
  ]

  const data: Contents[] = [
    {
      key: t('management.features.setting.name'),
      element: <>{'面接官1'}</>,
    },
    {
      key: t('management.features.setting.mail'),
      element: <>{'a@au.com'}</>,
    },
    {
      key: t('management.features.setting.role'),
      element: <>{'面接官'}</>,
    },
    {
      key: t('management.features.setting.color'),
      element: (
        <Box sx={ColorBox}>
          <Box sx={ColorBoxChild}>
            {map(colorSet, (obj, index) => (
              <Box key={index} sx={ColorBoxChildNowrap}>
                <Button
                  variant="contained"
                  sx={[
                    ColorButton,
                    {
                      backgroundColor: obj.color,
                      '&:hover': {
                        backgroundColor: obj.color,
                      },
                    },
                  ]}
                  onClick={(e) => {
                    e.preventDefault()

                    store.dispatch(mgChangeSetting(obj))

                    router.push(RouterPath.ManagementSetting)
                  }}
                >
                  <Typography variant="body2">{obj.color}</Typography>
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
  ]

  return (
    <>
      <NextHead></NextHead>
      <Content data={data}></Content>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Setting

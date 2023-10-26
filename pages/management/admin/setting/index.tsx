import Content from '@/components/Content'
import { mgChangeSetting } from '@/hooks/store'
import store, { RootState } from '@/hooks/store/store'
import { Contents } from '@/types/management'
import { deepPurple, indigo, red } from '@material-ui/core/colors'
import { Box, Button, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RouterPath } from '@/enum/router'
import { map } from 'lodash'
import NextHead from '@/components/Header'

const Setting = () => {
  const router = useRouter()
  const t = useTranslations()

  const setting = useSelector((state: RootState) => state.management.setting)

  const colors = [
    {
      label: 'indigo',
      values: [indigo[300], indigo[500], indigo[800]],
    },
    {
      label: 'purple',
      values: [deepPurple[300], deepPurple[500], deepPurple[800]],
    },
    {
      label: 'red',
      values: [red[300], red[500], red[800]],
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
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {map(colors, (colorGroup, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'nowrap',
                }}
              >
                {map(colorGroup.values, (colorValue, idx) => (
                  <Button
                    key={idx}
                    variant="contained"
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: colorValue,
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: colorValue,
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault()

                      store.dispatch(
                        mgChangeSetting({
                          color: colorValue,
                        }),
                      )

                      router.push(RouterPath.ManagementSetting)
                    }}
                  >
                    <Typography variant="body2">{colorValue}</Typography>
                  </Button>
                ))}
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

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      baseUrl: process.env.NEXT_CSR_URL,
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Setting

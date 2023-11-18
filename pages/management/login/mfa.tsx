import React, { useState, useRef, useEffect } from 'react'
import {
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
} from '@material-ui/core' // digitのため@material-ui/coreで対応
import { makeStyles } from '@material-ui/core/styles'
import { every, isEmpty, isEqual } from 'lodash'
import { useRouter } from 'next/router'
import NextHead from '@/components/Header'
import { RouterPath } from '@/enum/router'
import { useTranslations } from 'next-intl'
import { MFACSR, MFACreateCSR } from '@/api/repository'
import { toast } from 'react-toastify'
import { RootState } from '@/hooks/store/store'
import { useSelector } from 'react-redux'
import { common } from '@mui/material/colors'
import ClearIcon from '@mui/icons-material/Clear'
import { HashKeyRequest, MFARequest } from '@/api/model/management'
import { APICommonCode, APIMFACode, APISessionCheckCode } from '@/enum/apiError'

const CODE_SIZE = 6

const MFA = ({ baseUrl }) => {
  const router = useRouter()
  const t = useTranslations()

  const setting = useSelector((state: RootState) => state.management.setting)
  const user = useSelector((state: RootState) => state.management.user)

  const [computed, setComputed] = useState(false)

  useEffect(() => {
    MFACreateCSR(baseUrl, {
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
  }, [computed])

  // @material-ui/coreなのでやむなく個別のstyle定義
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '320px',
      textAlign: 'center',
    },
    message: {
      marginBottom: theme.spacing(4),
    },
    digitField: {
      width: '3rem',
      margin: theme.spacing(1),
      '& input': {
        textAlign: 'center',
        fontSize: '2rem',
        '-moz-appearance': 'textfield',
        '&::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      },
    },
    buttonsContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
    },
    buttonBack: {
      margin: theme.spacing(1),
      backgroundColor: common.white,
      '&:hover': {
        backgroundColor: common.white,
      },
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: setting.color,
      color: common.white,
      '&:hover': {
        backgroundColor: setting.color,
        color: common.white,
      },
    },
  }))

  const classes = useStyles()
  const [code, setCode] = useState(new Array(CODE_SIZE).fill(''))
  const inputRefs = useRef(new Array(CODE_SIZE).fill(null))

  const handleChange = (index) => (e) => {
    const newCode = [...code]
    const { value } = e.target

    if (!isEmpty(value)) newCode[index] = value.slice(0, 1)
    setCode(newCode)

    if (!isEmpty(value)) {
      if (index < CODE_SIZE - 1) {
        inputRefs.current[index + 1].focus()
      }
    } else if (index > 0) {
      inputRefs.current[index].focus()
    }
  }

  const submit = async () => {
    const codeString = code.join('')

    await MFACSR(baseUrl, {
      hash_key: user.hashKey,
      email: user.mail,
      code: codeString,
    } as MFARequest)
      .then(() => {
        router.push(RouterPath.ManagementLoginPasswordChange)
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
        } else {
          msg = t(`common.api.code.mfa${error.response.data.code}`)
        }

        toast(msg, {
          style: {
            backgroundColor: setting.toastErrorColor,
            color: common.white,
            width: 600,
          },
          position: 'bottom-left',
          hideProgressBar: true,
          closeButton: () => <ClearIcon />,
        })

        if (isEqual(error.response.data.code, APIMFACode.Expired)) {
          setComputed((prev) => !prev)
          setCode(new Array(CODE_SIZE).fill(''))
          // router.push(RouterPath.ManagementLoginMFA)
        }
      })
  }

  return (
    <>
      <NextHead></NextHead>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="body1" className={classes.message}>
          <p>{t('management.features.login.mfaMsg1')}</p>
          <p>{t('management.features.login.mfaMsg2')}</p>
        </Typography>
        <Grid container justifyContent="center">
          {code.map((digit, index) => (
            <TextField
              key={index}
              className={classes.digitField}
              value={digit}
              autoFocus={isEqual(index, 0)}
              onChange={handleChange(index)}
              inputProps={{ maxLength: 1 }}
              type="tel"
              inputRef={(ref) => {
                inputRefs.current[index] = ref
              }}
              onKeyUp={(e) => {
                if (isEqual(e.key, 'Backspace')) {
                  const newCode = [...code]
                  if (isEmpty(newCode[index]) && index > 0) {
                    newCode[index - 1] = ''
                    setCode(newCode)
                    inputRefs.current[index - 1].focus()
                    return
                  }

                  newCode[index] = ''
                  setCode(newCode)
                }
              }}
            />
          ))}
        </Grid>
        <Box className={classes.buttonsContainer}>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.buttonBack}
            onClick={() => router.push(RouterPath.ManagementLogin)}
          >
            {t('common.button.back')}
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={submit}
            disabled={!code.every((digit) => !isEmpty(digit.trim()))}
          >
            {t('common.button.auth')}
          </Button>
        </Box>
      </Container>
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

export default MFA

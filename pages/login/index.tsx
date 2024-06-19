import React, { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Copyright from '@/components/Copyright'
import { FormValidation, FormValidationValue } from '@/hooks/validation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Pattern, ValidationType } from '@/enum/validation'
import ErrorHandler from '@/components/ErrorHandler'
import _, { every, isEmpty, isEqual, trim } from 'lodash'
import { LogoutCSR, MFACSR, MFACreateCSR, loginCSR } from '@/api/repository'
import { useRouter } from 'next/router'
import {
  LoginMain,
  minW,
  mt,
  mb,
  SecondaryMain,
  m,
  ButtonColor,
} from '@/styles/index'
import store, { RootState } from '@/hooks/store/store'
import { commonDispatch, signOut, userDispatch } from '@/hooks/store'
import { CommonModel, UserModel } from '@/types/index'
import { RouterPath } from '@/enum/router'
import NextHead from '@/components/Header'
import {
  LoginRequest,
  LogoutRequest,
  MFACreateRequest,
  MFARequest,
} from '@/api/model/index'
import {
  APICommonCode,
  APILoginCode,
  APIMFACode,
  APISessionCheckCode,
} from '@/enum/apiError'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { common, indigo, red } from '@mui/material/colors'
import ClearIcon from '@mui/icons-material/Clear'
import MFA from '@/components/MFA'

type Inputs = {
  mail: string
}

const Login = () => {
  const router = useRouter()
  const t = useTranslations()

  const commonStore = useSelector((state: RootState) => state.common)
  const user: UserModel = useSelector((state: RootState) => state.user)

  const [loading, isLoading] = useState<boolean>(true)
  const [hash, setHash] = useState<string>('')
  const [open, isOpen] = useState<boolean>(false)
  const submitButtonRef = useRef(null)

  const formValidationValue: FormValidationValue = {
    mail: {
      max: 50,
      pattern: new RegExp(Pattern.Mail),
    },
  }

  const formValidation: FormValidation = {
    mail: [
      {
        type: ValidationType.Required,
        message: t('features.login.mail') + t('common.validate.required'),
      },
      {
        type: ValidationType.MaxLength,
        message:
          t('features.login.mail') +
          t('common.validate.is') +
          String(formValidationValue.mail.max) +
          t('common.validate.maxLength'),
      },
      {
        type: ValidationType.Pattern,
        message: t('common.validate.pattern.mail'),
      },
    ],
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const submit: SubmitHandler<Inputs> = async (d: Inputs) => {
    // API ログイン
    await loginCSR({
      email: d.mail,
    } as LoginRequest)
      .then(async (res) => {
        setHash(String(res.data.hash_key))

        // API MFAコード生成
        await MFACreateCSR({
          hash_key: String(res.data.hash_key),
        } as MFACreateRequest)
          .then(() => {
            store.dispatch(
              userDispatch({
                hashKey: res.data.hash_key,
                name: res.data.name,
                mail: d.mail,
              } as UserModel),
            )
            isOpen(true)
          })
          .catch((error) => {
            if (
              _.every([
                500 <= error.response?.status,
                error.response?.status < 600,
              ])
            ) {
              router.push(RouterPath.Error)
              return
            }

            let msg = ''
            if (
              _.isEqual(error.response?.data.code, APICommonCode.BadRequest)
            ) {
              msg = t(`common.api.code.${error.response?.data.code}`)
            } else if (
              _.isEqual(
                error.response?.data.code,
                APISessionCheckCode.LoginRequired,
              )
            ) {
              msg = t(`common.api.code.expired${error.response?.data.code}`)
            }

            store.dispatch(
              commonDispatch({
                errorMsg: msg,
              } as CommonModel),
            )
          })
      })
      .catch((error) => {
        let msg = ''
        if (error.response?.data.code > 0) {
          if (isEqual(error.response?.data.code, APICommonCode.BadRequest)) {
            msg = t(`common.api.code.${error.response?.data.code}`)
          } else if (
            isEqual(error.response?.data.code, APILoginCode.LoinAuth)
          ) {
            msg = t(`common.api.code.login${error.response?.data.code}`)
          }

          toast(msg, {
            style: {
              backgroundColor: red[500],
              color: common.white,
              width: 500,
            },
            position: 'bottom-left',
            hideProgressBar: true,
            closeButton: () => <ClearIcon />,
          })
        }

        if (
          every([500 <= error.response?.status, error.response?.status < 600])
        ) {
          router.push(RouterPath.Error)
        }
      })
  }

  const reSend = async () => {
    isOpen(false)
    setTimeout(async () => {
      await submitButtonRef.current.click()
    }, 0.25 * 1000)
  }

  const reset = async () => {
    if (_.isEmpty(user.hashKey)) return
    // API ログアウト
    await LogoutCSR({
      hash_key: user.hashKey,
    } as LogoutRequest)
      .then(() => {
        store.dispatch(signOut())
      })
      .catch((error) => {
        if (
          _.every([500 <= error.response?.status, error.response?.status < 600])
        ) {
          router.push(RouterPath.Error)
          return
        }
      })
  }

  const mfaSubmit = async (mfa: string) => {
    // API MFA
    await MFACSR({
      hash_key: hash,
      code: mfa,
    } as MFARequest)
      .then(() => {
        isOpen(false)
        router.push(RouterPath.Main)
      })
      .catch(async (error) => {
        if (
          _.every([500 <= error.response?.status, error.response?.status < 600])
        ) {
          router.push(RouterPath.Error)
          return
        }

        let msg = ''
        if (_.isEqual(error.response?.data.code, APICommonCode.BadRequest)) {
          msg = t(`common.api.code.${error.response?.data.code}`)
        } else {
          msg = t(`common.api.code.mfa${error.response?.data.code}`)
        }

        toast(msg, {
          style: {
            backgroundColor: red[500],
            color: common.white,
            width: 600,
          },
          position: 'bottom-left',
          hideProgressBar: true,
          closeButton: () => <ClearIcon />,
        })

        if (_.isEqual(error.response?.data.code, APIMFACode.Expired)) {
          setTimeout(async () => {
            await submitButtonRef.current.click()
          }, 0.25 * 1000)
        }
      })
  }

  useEffect(() => {
    if (loading) {
      // トースト
      if (!isEmpty(commonStore.errorMsg)) {
        setTimeout(() => {
          toast(commonStore.errorMsg, {
            style: {
              backgroundColor: red[500],
              color: common.white,
              width: 630,
            },
            position: 'bottom-left',
            hideProgressBar: true,
            closeButton: () => <ClearIcon />,
          })
        }, 0.1 * 1000)

        store.dispatch(
          commonDispatch({
            errorMsg: '',
          } as CommonModel),
        )
        store.dispatch(signOut())
      }

      // ログアウト
      reset()
    }

    isLoading(false)
  }, [])

  return (
    <>
      <NextHead></NextHead>
      {!loading && (
        <>
          <Container component="main" maxWidth="xs" sx={mt(30)}>
            <CssBaseline />
            <Box sx={LoginMain}>
              <Avatar sx={[m(1), SecondaryMain]}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                {t('features.login.top')}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(submit)}
                noValidate
                sx={mt(1)}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={t('features.login.mail')}
                  autoFocus
                  sx={minW(396)}
                  {...register('mail', {
                    required: true,
                    maxLength: formValidationValue.mail.max,
                    pattern: formValidationValue.mail.pattern,
                    setValueAs: (value) => trim(value),
                  })}
                  aria-invalid={errors.mail ? 'true' : 'false'}
                />
                <ErrorHandler
                  validations={formValidation.mail}
                  type={errors.mail?.type}
                ></ErrorHandler>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  ref={submitButtonRef}
                  sx={[mt(3), mb(1), ButtonColor(common.white, indigo[500])]}
                >
                  {t('features.login.login')}
                </Button>
              </Box>
            </Box>
            <Copyright sx={[mt(8), mb(4)]} />
          </Container>

          <MFA
            open={open}
            back={() => {
              isOpen(false)
              reset()
            }}
            reSend={reSend}
            submit={mfaSubmit}
          />
        </>
      )}
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

export default Login

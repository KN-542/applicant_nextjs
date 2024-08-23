import React, { FC, useEffect, useRef, useState } from 'react'
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
import _ from 'lodash'
import {
  ConfirmTeamCSR,
  LogoutCSR,
  MFACSR,
  CreateMFACSR,
  LoginCSR,
} from '@/api/repository'
import { useRouter } from 'next/router'
import {
  LoginMain,
  minW,
  mt,
  mb,
  m,
  ButtonColor,
  BackGroundColor,
} from '@/styles/index'
import store, { RootState } from '@/hooks/store/store'
import { commonDispatch, signOut, userDispatch } from '@/hooks/store'
import { CommonModel, UserModel } from '@/types/index'
import { RouterPath } from '@/enum/router'
import NextHead from '@/components/Header'
import {
  ConfirmTeamRequest,
  LoginRequest,
  LogoutRequest,
  CreateMFARequest,
  MFARequest,
} from '@/api/model/index'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { blue, common, red } from '@mui/material/colors'
import ClearIcon from '@mui/icons-material/Clear'
import MFA from '@/components/MFA'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MFAStatus } from '@/enum/login'

type Props = {
  id: string
}

type Inputs = {
  mail: string
}

const Login: FC<Props> = ({ id }) => {
  const router = useRouter()
  const t = useTranslations()

  const commonStore = useSelector((state: RootState) => state.common)
  const user: UserModel = useSelector((state: RootState) => state.user)

  const [init, isInit] = useState<boolean>(true)
  const [hash, setHash] = useState<string>('')
  const [open, isOpen] = useState<boolean>(false)
  const submitButtonRef = useRef(null)

  const inits = async () => {
    // API: チーム存在確認
    await ConfirmTeamCSR({
      hash_key: decodeURIComponent(id),
    } as ConfirmTeamRequest)
      .then(() => {
        store.dispatch(userDispatch({ teamHashKey: decodeURIComponent(id) }))
        isInit(false)
      })
      .catch(({ isServerError, routerPath, toastMsg, _storeMsg, code }) => {
        if (isServerError) {
          router.push(routerPath)
          return
        }

        if (code) {
          router.push(RouterPath.NotFound)
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
      })
  }

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
    try {
      // API ログイン
      const res = await LoginCSR({
        email: d.mail,
        team_hash_key: decodeURIComponent(id),
      } as LoginRequest)

      setHash(String(res.data.hash_key))

      // API MFAコード生成
      await CreateMFACSR({
        hash_key: String(res.data.hash_key),
      } as CreateMFARequest)

      store.dispatch(
        userDispatch({
          hashKey: res.data.hash_key,
          teamHashKey: decodeURIComponent(id),
          name: res.data.name,
          mail: d.mail,
        } as UserModel),
      )
      isOpen(true)
    } catch ({ isServerError, routerPath, toastMsg, storeMsg, code }) {
      if (isServerError) {
        router.push(routerPath)
        return
      }

      if (code) {
        toast(t(`common.api.code.login${code}`), {
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
    }
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
      .catch(() => {
        router.push(RouterPath.Error)
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
      .catch(
        async ({ isServerError, routerPath, toastMsg, _storeMsg, code }) => {
          if (isServerError) {
            router.push(routerPath)
            return
          }

          if (code) {
            toast(t(`common.api.code.mfa${code}`), {
              style: {
                backgroundColor: red[500],
                color: common.white,
                width: 500,
              },
              position: 'bottom-left',
              hideProgressBar: true,
              closeButton: () => <ClearIcon />,
            })

            if (_.isEqual(MFAStatus.Expired, code)) {
              setTimeout(async () => {
                await submitButtonRef.current.click()
              }, 0.25 * 1000)
            }
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
        },
      )
  }

  useEffect(() => {
    // トースト
    if (!_.isEmpty(commonStore.errorMsg)) {
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

    // チーム存在確認
    inits()
  }, [])

  return (
    <>
      <NextHead />
      {!init && (
        <>
          <Container component="main" maxWidth="xs" sx={mt(30)}>
            <CssBaseline />
            <Box sx={LoginMain}>
              <Avatar sx={[m(1), BackGroundColor(blue[500])]}>
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
                    setValueAs: (value) => value.trim(),
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
                  sx={[mt(3), mb(1), ButtonColor(common.white, blue[500])]}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // 空配列を返す。全てのパスは初回アクセス時に生成される。
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return {
    props: {
      id: params?.id,
      messages: (await import(`../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Login

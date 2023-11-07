import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
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
import { trim } from 'lodash'
import { loginCSR, loginSSR } from '@/api/repository'
import { useRouter } from 'next/router'
import {
  LoginMain,
  M1,
  MinW396,
  Mt1,
  Mt20,
  Mt3Mb1,
  Mt8Mb4,
  SecondaryMain,
} from '@/styles/index'
import store from '@/hooks/store/store'
import { mgUserSignIn } from '@/hooks/store'
import { UserModel } from 'types/management'
import { RouterPath } from '@/enum/router'
import NextHead from '@/components/Header'

type Inputs = {
  mail: string
  password: string
}

const Login = ({ baseUrl }) => {
  const router = useRouter()

  const [_dataCSR, setDataCSR] = useState('')

  const testAPI = async () => {
    await loginCSR(baseUrl).then((res) => {
      setDataCSR(res.data)
    })
  }

  useEffect(() => {
    testAPI()
  }, [])

  const t = useTranslations()

  const formValidationValue: FormValidationValue = {
    mail: {
      max: 30,
      pattern: new RegExp(Pattern.Mail),
    },
    password: {
      min: 8,
      max: 16,
      pattern: new RegExp(Pattern.HalfAlphaNum),
    },
  }

  const formValidation: FormValidation = {
    mail: [
      {
        type: ValidationType.Required,
        message:
          t('management.features.login.mail') + t('common.validate.required'),
      },
      {
        type: ValidationType.MaxLength,
        message:
          t('management.features.login.mail') +
          t('common.validate.is') +
          String(formValidationValue.mail.max) +
          t('common.validate.maxLength'),
      },
      {
        type: ValidationType.Pattern,
        message: t('common.validate.pattern.mail'),
      },
    ],
    password: [
      {
        type: ValidationType.Required,
        message:
          t('management.features.login.password') +
          t('common.validate.required'),
      },
      {
        type: ValidationType.MinLength,
        message:
          t('management.features.login.password') +
          t('common.validate.is') +
          String(formValidationValue.password.min) +
          t('common.validate.minLength') +
          String(formValidationValue.password.max) +
          t('common.validate.maxLength'),
      },
      {
        type: ValidationType.MaxLength,
        message:
          t('management.features.login.password') +
          t('common.validate.is') +
          String(formValidationValue.password.min) +
          t('common.validate.minLength') +
          String(formValidationValue.password.max) +
          t('common.validate.maxLength'),
      },
      {
        type: ValidationType.Pattern,
        message:
          t('management.features.login.password') +
          t('common.validate.is') +
          t('common.validate.halfAlphaNum'),
      },
    ],
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const submit: SubmitHandler<Inputs> = async (d: Inputs) => {
    // TODO API
    await loginCSR(baseUrl).then(() => {
      store.dispatch(
        mgUserSignIn({
          name: '古家野 有栖',
          mail: d.mail,
        } as UserModel),
      )
      router.push(RouterPath.ManagementApplicant)
    })
  }

  return (
    <>
      <NextHead></NextHead>
      <Container component="main" maxWidth="xs" sx={Mt20}>
        <CssBaseline />
        <Box sx={LoginMain}>
          <Avatar sx={[M1, SecondaryMain]}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('management.features.login.top')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submit)}
            noValidate
            sx={Mt1}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('management.features.login.mail')}
              autoFocus
              sx={MinW396}
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
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              label={t('management.features.login.password')}
              autoComplete="current-password"
              sx={MinW396}
              {...register('password', {
                required: true,
                minLength: formValidationValue.password.min,
                maxLength: formValidationValue.password.max,
                pattern: formValidationValue.password.pattern,
                setValueAs: (value) => trim(value),
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <ErrorHandler
              validations={formValidation.password}
              type={errors.password?.type}
            ></ErrorHandler>
            <Grid container sx={Mt3Mb1}>
              <Grid item>
                <Link href="#" variant="body2">
                  {t('management.features.login.forgotPassword')}
                </Link>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained">
              {t('management.features.login.login')}
            </Button>
          </Box>
        </Box>
        <Copyright sx={Mt8Mb4} />
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const data = await loginSSR().then((res) => {
    return res.data
  })
  return {
    props: {
      data,
      baseUrl: process.env.NEXT_CSR_URL,
      messages: (await import(`../../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Login

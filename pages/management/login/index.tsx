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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from '@/components/Copyright'
import { FormValidation, FormValidationValue } from '@/hooks/validation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Pattern, ValidationType } from '@/enum/validation'
import ErrorHandler from '@/components/ErrorHandler'
import { trim } from 'lodash'
import { loginCSR, loginSSR } from '@/api/repository'

const defaultTheme = createTheme()

type Inputs = {
  mail: string
  password: string
}

const Login = ({ baseUrl }) => {
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

  const submit: SubmitHandler<Inputs> = (d: Inputs) => console.log(d)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('management.features.login.top')}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label={t('management.features.login.mail')}
              autoFocus
              sx={{ minWidth: 396 }}
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
              sx={{ minWidth: 396 }}
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
            <Grid container sx={{ mt: 3, mb: 1 }}>
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
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

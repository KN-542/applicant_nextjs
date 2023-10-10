import React from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
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
import { ValidationType } from '@/enum/validation'
import ErrorHandler from '@/components/ErrorHandler'

const defaultTheme = createTheme()

type Inputs = {
  mail: string
  password: string
}

const Login = () => {
  const t = useTranslations()

  const formValidationValue: FormValidationValue = {
    mail: {
      max: 2,
    },
    password: {
      max: 20,
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
          t('common.validate.max.1') +
          String(formValidationValue.mail.max) +
          t('common.validate.max.2'),
      },
    ],
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const submit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            {t('management.features.login.login')}
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
              label="Email Address"
              autoFocus
              {...register('mail', {
                required: true,
                maxLength: formValidationValue.mail.max,
              })}
              aria-invalid={errors.mail ? 'true' : 'false'}
            />
            <ErrorHandler
              validations={formValidation.mail}
              type={errors.mail?.type}
            ></ErrorHandler>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              autoComplete="current-password"
              {...register('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Login

import NextHead from '@/components/Header'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  DialogContent,
  TextField,
  Typography,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { LoginMain, MinWidth396, Mt1, Mt20 } from '@/styles/index'
import { register } from 'module'
import ErrorHandler from '@/components/ErrorHandler'
import { common } from '@material-ui/core/colors'
import { RootState } from '@/hooks/store/store'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import _, {
  every,
  filter,
  isEmpty,
  isNumber,
  keys,
  map,
  min,
  size,
  trim,
} from 'lodash'
import { Role, dispRole } from '@/enum/user'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { FormValidation, FormValidationValue } from '@/hooks/validation'
import { Pattern, ValidationType } from '@/enum/validation'
import { RouterPath } from '@/enum/router'
import { useState } from 'react'

const UserCreate = () => {
  const router = useRouter()
  const t = useTranslations()

  const setting = useSelector((state: RootState) => state.management.setting)

  type Inputs = {
    name: string
    mail: string
    role: string
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const formValidationValue: FormValidationValue = {
    name: {
      max: 30,
    },
    mail: {
      max: 50,
      pattern: new RegExp(Pattern.Mail),
    },
    role: {},
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
    name: [
      {
        type: ValidationType.Required,
        message:
          t('management.features.user.header.name') +
          t('common.validate.required'),
      },
      {
        type: ValidationType.MaxLength,
        message:
          t('management.features.user.header.name') +
          t('common.validate.is') +
          String(formValidationValue.name.min) +
          t('common.validate.minLength') +
          String(formValidationValue.name.max) +
          t('common.validate.maxLength'),
      },
    ],
    role: [
      {
        type: ValidationType.Required,
        message:
          t('management.features.user.header.role') +
          t('common.validate.requiredRadio'),
      },
    ],
  }

  const submit: SubmitHandler<Inputs> = async (d: Inputs) => {
    console.log(d)
  }

  return (
    <>
      <NextHead></NextHead>
      <DialogContent
        sx={{
          backgroundColor: common.white,
          width: '80%',
          margin: '0 auto',
          mt: 15,
          boxShadow: '0 4px 8px',
          p: 3,
          borderRadius: 20,
        }}
      >
        <Box sx={{ m: '0 auto', width: '90%' }}>
          <CssBaseline />
          <Box
            component="form"
            onSubmit={handleSubmit(submit)}
            noValidate
            sx={{ mt: 4, display: 'flex', flexFlow: 'column' }}
          >
            <FormLabel>
              {t('management.features.user.header.name') + '*'}
            </FormLabel>
            <TextField
              margin="normal"
              required
              style={{ width: '50%' }}
              {...register('name', {
                required: true,
                maxLength: formValidationValue.name.max,
                setValueAs: (value) => trim(value),
              })}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            <ErrorHandler
              validations={formValidation.name}
              type={errors.name?.type}
            ></ErrorHandler>

            <FormLabel sx={{ mt: 6 }}>
              {t('management.features.user.header.mail') + '*'}
            </FormLabel>
            <TextField
              margin="normal"
              required
              style={{ width: '50%' }}
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
            <FormLabel sx={{ mt: 6 }}>
              {t('management.features.user.header.role') + '*'}
            </FormLabel>
            <RadioGroup
              aria-invalid={errors.role ? 'true' : 'false'}
              row
              aria-label="position"
              name="role"
              value={watch('role') || ''}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: `${
                  min([4, size(filter(keys(Role), (r) => !isNaN(Number(r))))]) *
                  12.5
                }%`,
              }}
            >
              {map(
                filter(keys(Role), (r) => !isNaN(Number(r))),
                (key) => {
                  return (
                    <FormControlLabel
                      key={key}
                      color={setting.color}
                      value={Number(key)}
                      control={
                        <Radio
                          {...register('role', {
                            required: true,
                          })}
                          style={{ color: setting.color }}
                          value={Number(key)}
                        />
                      }
                      label={t(dispRole(Number(key)))}
                    />
                  )
                },
              )}
            </RadioGroup>
            <ErrorHandler
              validations={formValidation.role}
              type={errors.role?.type}
            ></ErrorHandler>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '33%',
                m: '0 auto',
                mt: 8,
              }}
            >
              <Button
                size="large"
                variant="outlined"
                color="inherit"
                onClick={() => router.push(RouterPath.ManagementUser)}
              >
                {t('common.button.cancel')}
              </Button>
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: setting.color,
                  '&:hover': {
                    backgroundColor: setting.color,
                  },
                }}
              >
                <AddCircleOutlineIcon sx={{ mr: 0.25 }} />
                {t('management.features.user.create')}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
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

export default UserCreate

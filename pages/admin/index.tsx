import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  DialogContent,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { common, red } from '@mui/material/colors'
import {
  mt,
  mb,
  w,
  DialogContentMain,
  M0Auto,
  FormBox,
  ml,
  mr,
  FormContent,
  minW,
  Title,
  SubTitle,
  SubTitleMsg,
  Bold,
  confirmButton,
  FileDisp,
} from '@/styles/index'
import NextHead from '@/components/Header'
import DateRangeIcon from '@mui/icons-material/DateRange'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DragDrop from '@/components/DragDrop'
import { DocumentsCSR, HolidaysJp } from '@/api/repository'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import { every, isEmpty, isEqual, map, size, some } from 'lodash'
import ConfirmModal from '@/components/ConfirmModal'
import { RouterPath } from '@/enum/router'
import { RootState } from '@/hooks/store/store'
import { APICommonCode } from '@/enum/apiError'

const Applicant = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const RESUME = 'resume'
  const CURRICULUM_VITAE = 'curriculumVitae'

  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState(null)
  const [resume, setResume] = useState(null)
  const [curriculumVitae, setCurriculumVitae] = useState(null)
  const [resumeName, setResumeName] = useState('')
  const [curriculumVitaeName, setCurriculumVitaeName] = useState('')
  const [resumeExtension, setResumeExtension] = useState('')
  const [curriculumVitaeExtension, setCurriculumVitaeExtension] = useState('')
  const [element, setElement] = useState(<></>)
  const [element2, setElement2] = useState(<></>)

  const generateDateOptions = async (daysRange = 10, startOffsetDays = 7) => {
    const options = ['']
    const today = new Date()
    const startDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + startOffsetDays,
    )

    await HolidaysJp()
      .then((holidays) => {
        let count = 0
        while (size(options) <= daysRange + 1) {
          const date = new Date(
            startDay.getFullYear(),
            startDay.getMonth(),
            startDay.getDate() + count,
          )
          count++
          const day = date.getDay()
          const dateStr = date.toISOString().split('T')[0]

          if (
            every([!holidays.data[dateStr], !isEqual(day, 0), !isEqual(day, 6)])
          ) {
            options.push(dateStr)
          }
        }
      })
      .catch(() => {
        router.push(RouterPath.Error)
        return [] // この行は実際には機能しない
      })

    return options
  }

  const [dateOptions, setDateOptions] = useState<string[]>([])
  const timeOptions = [
    '',
    '9:00 ~ 12:00',
    '12:00 ~ 14:00',
    '14:00 ~ 16:00',
    '18:00 ~ 20:00',
  ]

  type MakeInputs<T extends number> = Record<`date${T}` | `time${T}`, string>

  type Inputs = MakeInputs<1> &
    MakeInputs<2> &
    MakeInputs<3> &
    MakeInputs<4> &
    MakeInputs<5>

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      date1: '',
      time1: '',
      date2: '',
      time2: '',
      date3: '',
      time3: '',
      date4: '',
      time4: '',
      date5: '',
      time5: '',
    },
  })

  const daysFormList = [
    {
      name: t('features.main.1st'),
      required: true,
    },
    {
      name: t('features.main.2nd'),
      required: false,
    },
    {
      name: t('features.main.3rd'),
      required: false,
    },
    {
      name: t('features.main.4th'),
      required: false,
    },
    {
      name: t('features.main.5th'),
      required: false,
    },
  ]

  const onSubmit = (data: Inputs) => {
    if (some([isEmpty(data.date1), isEmpty(data.time1)])) {
      toast(t('features.main.1st') + t('common.validate.required'), {
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
    for (let i = 2; i < size(daysFormList); i++) {
      if (
        every([!isEmpty(data[`date${i + 1}`]), !isEmpty(data[`time${i + 1}`])])
      ) {
        for (let j = i - 1; j > 0; j--) {
          if (
            some([isEmpty(data[`date${j + 1}`]), isEmpty(data[`time${j + 1}`])])
          ) {
            toast(
              daysFormList[j]['name'] +
                t('features.main.priority') +
                daysFormList[i]['name'] +
                t('features.main.priority2'),
              {
                style: {
                  backgroundColor: red[500],
                  color: common.white,
                  width: 600,
                },
                position: 'bottom-left',
                hideProgressBar: true,
                closeButton: () => <ClearIcon />,
              },
            )
            return
          }
        }
      }
    }
    for (let i = 0; i < size(daysFormList); i++) {
      if (some([isEmpty(data[`date${i + 1}`]), isEmpty(data[`time${i + 1}`])]))
        continue
      for (let j = 0; j < size(daysFormList); j++) {
        if (isEqual(i, j)) continue
        if (
          every([
            isEqual(data[`date${i + 1}`], data[`date${j + 1}`]),
            isEqual(data[`time${i + 1}`], data[`time${j + 1}`]),
          ])
        ) {
          toast(
            daysFormList[i]['name'] +
              t('features.main.duplication') +
              daysFormList[j]['name'] +
              t('features.main.duplication2'),
            {
              style: {
                backgroundColor: red[500],
                color: common.white,
                width: 600,
              },
              position: 'bottom-left',
              hideProgressBar: true,
              closeButton: () => <ClearIcon />,
            },
          )
          return
        }
      }
    }

    setInputs(data)

    setElement(
      <>
        {map(daysFormList, (item, index) => {
          return (
            <Typography key={index} component="h6" sx={[mb(2), Bold]}>
              {`・${item.name} `}
              <Box component="span" sx={ml(5)}>
                {every([
                  !isEmpty(data[`date${index + 1}`]),
                  !isEmpty(data[`time${index + 1}`]),
                ])
                  ? `${data[`date${index + 1}`]} ${data[`time${index + 1}`]}`
                  : '-'}
              </Box>
            </Typography>
          )
        })}
      </>,
    )
    setElement2(
      <>
        <Typography component="h6" sx={[mb(2), Bold]}>
          {`・${t('features.main.resume')} `}
          {!isEmpty(resumeName) && (
            <Box component="span" sx={[FileDisp, ml(5)]}>
              <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
              {resumeName}
            </Box>
          )}
          {isEmpty(resumeName) && (
            <Box component="span" sx={ml(5)}>
              {'-'}
            </Box>
          )}
        </Typography>
        <Typography component="h6" sx={[mb(2), Bold]}>
          {`・${t('features.main.curriculumVitae')} `}
          {!isEmpty(curriculumVitaeName) && (
            <Box component="span" sx={[FileDisp, ml(5)]}>
              <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
              {curriculumVitaeName}
            </Box>
          )}
          {isEmpty(curriculumVitaeName) && (
            <Box component="span" sx={ml(5)}>
              {'-'}
            </Box>
          )}
        </Typography>
      </>,
    )

    setOpen(true)
  }

  const readFile = async (file: File, dropArea: string) => {
    // 拡張子の確認
    const allowedExtensions = /(\.xlsx|\.xls|\.docx|\.doc|\.pptx|\.ppt|\.pdf)$/
    if (!allowedExtensions.test(file.name.toLowerCase())) {
      toast(t('common.validate.pattern.file'), {
        style: {
          backgroundColor: red[500],
          color: common.white,
          width: 800,
        },
        position: 'bottom-left',
        hideProgressBar: true,
        closeButton: () => <ClearIcon />,
      })
      return
    }

    if (isEqual(dropArea, RESUME)) {
      setResume(file)
      setResumeName(file.name)
      setResumeExtension(file.name.substring(file.name.lastIndexOf('.') + 1))
      return
    }
    if (isEqual(dropArea, CURRICULUM_VITAE)) {
      setCurriculumVitae(file)
      setCurriculumVitaeName(file.name)
      setCurriculumVitaeExtension(
        file.name.substring(file.name.lastIndexOf('.') + 1),
      )
    }
  }

  const submit = async () => {
    const formData = new FormData()
    if (!isEmpty(resumeName)) {
      formData.append('resume', resume)
      formData.append('resume_extension', resumeExtension)
    }
    if (!isEmpty(curriculumVitaeName)) {
      formData.append('curriculum_vitae', curriculumVitae)
      formData.append('curriculum_vitae_extension', curriculumVitaeExtension)
    }

    if (some([!isEmpty(resumeName), !isEmpty(curriculumVitaeName)])) {
      formData.append('hash_key', user.hashKey)
      formData.append(
        'file_name',
        `${user.name}_${user.mail.replace(/\./g, '')}`,
      )

      await DocumentsCSR(formData)
        .then(() => {
          router.push(RouterPath.Complete)
        })
        .catch((error) => {
          if (
            every([500 <= error.response.status, error.response.status < 600])
          ) {
            router.push(RouterPath.Error)
            return
          }

          if (isEqual(error.response.data.code, APICommonCode.BadRequest)) {
            toast(t(`common.api.code.${error.response.data.code}`), {
              style: {
                backgroundColor: red[500],
                color: common.white,
                width: 600,
              },
              position: 'bottom-left',
              hideProgressBar: true,
              closeButton: () => <ClearIcon />,
            })
            return
          }
        })
    }
  }

  useEffect(() => {
    const fetchDateOptions = async () => {
      const options = await generateDateOptions()
      setDateOptions(options)
    }

    fetchDateOptions()
  }, [])

  return (
    <>
      <NextHead></NextHead>

      <Typography component="h3" variant="h5" sx={Title}>
        {t('features.main.title')}
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={mt(20)}
      >
        <Typography component="h3" variant="h5" sx={[SubTitle, w(90), mb(2)]}>
          <DateRangeIcon sx={mr(0.25)} />
          {t('features.main.subTitle')}
        </Typography>
        <Box sx={[SubTitleMsg, mb(5)]}>
          <p>{t('features.main.subTitleMsg')}</p>
          <p>{t('features.main.subTitleMsg2')}</p>
        </Box>
        <DialogContent sx={[DialogContentMain, w(90), mb(10)]}>
          <CssBaseline />
          <Box sx={[M0Auto, w(90)]}>
            <Box sx={FormBox}>
              {map(daysFormList, (form, index) => (
                <Box key={index} sx={[mb(10)]}>
                  <Typography component="h6" sx={[mb(2), Bold]}>
                    {`・${form.name}${
                      form.required ? ` (${t('features.main.required')})` : ''
                    }`}
                  </Typography>
                  <Grid container alignItems="center" sx={[FormContent, ml(3)]}>
                    <Box sx={[w(45), mb(2)]}>
                      <Box component="span">{`${t(
                        'features.main.date',
                      )} `}</Box>
                      <FormControl
                        sx={[w(40), minW(200), ml(3)]}
                        variant="outlined"
                      >
                        <Select
                          {...register(`date${index + 1}` as keyof Inputs)}
                          defaultValue=""
                        >
                          {dateOptions.map((date, dateIndex) => (
                            <MenuItem key={dateIndex} value={date}>
                              {date}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={[w(45), mb(2)]}>
                      <Box component="span">{`${t(
                        'features.main.time',
                      )} `}</Box>
                      <FormControl
                        sx={[w(40), minW(200), ml(3)]}
                        variant="outlined"
                      >
                        <Select
                          {...register(`time${index + 1}` as keyof Inputs)}
                          defaultValue=""
                        >
                          {timeOptions.map((time, timeIndex) => (
                            <MenuItem key={timeIndex} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <Typography component="h3" variant="h5" sx={[SubTitle, w(90), mb(2)]}>
          <InsertDriveFileIcon sx={mr(0.25)} />
          {t('features.main.subTitle2')}
        </Typography>
        <Box sx={[SubTitleMsg, mb(5)]}>
          <p>{t('features.main.subTitle2Msg')}</p>
          <p>{t('features.main.subTitle2Msg2')}</p>
          <p>{t('features.main.subTitle2Msg3')}</p>
        </Box>

        <DialogContent sx={[DialogContentMain, w(90), mb(10)]}>
          <CssBaseline />
          <Box sx={[mb(10), mt(5)]}>
            <DragDrop
              afterFuncAsync={(file) => readFile(file, RESUME)}
              title={
                <>
                  <Box component="span">{`・${t('features.main.resume')}`}</Box>
                  {!isEmpty(resumeName) && (
                    <>
                      <Box component="span" sx={[FileDisp, ml(5)]}>
                        <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
                        {resumeName}
                      </Box>
                      <Box component="span" sx={ml(1)}>
                        <Button
                          type="button"
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: common.white,
                            },
                          }}
                          onClick={() => {
                            setResumeName('')
                            setResume(null)
                          }}
                        >
                          {t('common.button.delete')}
                        </Button>
                      </Box>
                    </>
                  )}
                </>
              }
              dropAreaIdentifier={RESUME}
            ></DragDrop>
          </Box>
          <Box sx={[mb(10)]}>
            <DragDrop
              afterFuncAsync={(file) => readFile(file, CURRICULUM_VITAE)}
              title={
                <>
                  <Box component="span">{`・${t(
                    'features.main.curriculumVitae',
                  )}`}</Box>
                  {!isEmpty(curriculumVitaeName) && (
                    <>
                      <Box component="span" sx={[FileDisp, ml(5)]}>
                        <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
                        {curriculumVitaeName}
                      </Box>
                      <Box component="span" sx={ml(1)}>
                        <Button
                          type="button"
                          color="error"
                          sx={{
                            '&:hover': {
                              backgroundColor: common.white,
                            },
                          }}
                          onClick={() => {
                            setCurriculumVitaeName('')
                            setCurriculumVitae(null)
                          }}
                        >
                          {t('common.button.delete')}
                        </Button>
                      </Box>
                    </>
                  )}
                </>
              }
              dropAreaIdentifier={CURRICULUM_VITAE}
            ></DragDrop>
          </Box>
        </DialogContent>

        <Button type="submit" variant="contained" sx={confirmButton}>
          {t('common.button.confirm')}
        </Button>
      </Box>

      <ConfirmModal
        open={open}
        element={element}
        element2={element2}
        submit={submit}
        cancel={() => setOpen(false)}
      ></ConfirmModal>
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

export default Applicant

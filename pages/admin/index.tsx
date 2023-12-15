import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  DialogContent,
  CssBaseline,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useRouter } from 'next/router'
import { common, indigo, red } from '@mui/material/colors'
import {
  mt,
  mb,
  w,
  DialogContentMain,
  ml,
  mr,
  minW,
  Title,
  SubTitle,
  SubTitleMsg,
  Bold,
  confirmButton,
  FileDisp,
  ButtonColor,
  TableTop,
  TableCon,
  Table0_0,
  TableCellColor,
  TableBodyCell,
} from '@/styles/index'
import NextHead from '@/components/Header'
import DateRangeIcon from '@mui/icons-material/DateRange'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DragDrop from '@/components/DragDrop'
import { DesiredAtCSR, DocumentsCSR, HolidaysJp } from '@/api/repository'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import { every, filter, isEmpty, isEqual, map, size, some } from 'lodash'
import ConfirmModal from '@/components/ConfirmModal'
import { RouterPath } from '@/enum/router'
import { RootState } from '@/hooks/store/store'
import { APICommonCode } from '@/enum/apiError'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import { DesiredAtRequest } from '@/api/model'

const Applicant = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const RESUME = 'resume'
  const CURRICULUM_VITAE = 'curriculumVitae'
  const WEEKS = 14

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [resume, setResume] = useState(null)
  const [curriculumVitae, setCurriculumVitae] = useState(null)
  const [resumeName, setResumeName] = useState('')
  const [curriculumVitaeName, setCurriculumVitaeName] = useState('')
  const [resumeExtension, setResumeExtension] = useState('')
  const [curriculumVitaeExtension, setCurriculumVitaeExtension] = useState('')
  const [element, setElement] = useState(<></>)
  const [element2, setElement2] = useState(<></>)

  const generateDateOptions = async (
    daysRange = WEEKS - 1,
    startOffsetDays = 7,
  ) => {
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

  // TODO API
  const [scheduleData, setScheduleData] = useState([
    {
      time: '9:00',
      dates: new Array(WEEKS).fill(false),
      clickId: -1,
    },
    {
      time: '10:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '11:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '12:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '13:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '14:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '15:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '16:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '17:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '18:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '19:00',
      dates: new Array(WEEKS).fill(true),
      clickId: -1,
    },
    {
      time: '20:00',
      dates: new Array(WEEKS).fill(false),
      clickId: -1,
    },
  ])

  const onSubmit = () => {
    if (isEmpty(date)) {
      toast(t('features.main.subTitle') + t('common.validate.required'), {
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

    setElement(
      <>
        <Typography component="h6" sx={[mb(2), Bold]}>
          {`・${t('features.main.subTitle')} `}
          <Box component="span" sx={ml(5)}>
            {date}
          </Box>
        </Typography>
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

    await DesiredAtCSR({
      hash_key: user.hashKey,
      desired_at: date,
    } as DesiredAtRequest)
      .then(async () => {
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
                every([
                  500 <= error.response.status,
                  error.response.status < 600,
                ])
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
        } else {
          router.push(RouterPath.Complete)
        }
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

      <Box component="div" sx={mt(20)}>
        <Typography component="h3" variant="h5" sx={[SubTitle, w(90), mb(2)]}>
          <DateRangeIcon sx={mr(0.25)} />
          {t('features.main.subTitle')}
        </Typography>
        <Box sx={[SubTitleMsg, mb(5)]}>
          <p>{t('features.main.subTitleMsg')}</p>
        </Box>

        <Box sx={[w(90), TableTop, mb(20)]}>
          <TableContainer component={Paper} sx={TableCon}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={[TableCellColor, Table0_0]}></TableCell>
                  {filter(dateOptions, (item) => !isEmpty(item)).map(
                    (date, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={[minW(130), TableCellColor]}
                      >
                        {date}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={[minW(130), TableCellColor, TableBodyCell]}
                    >
                      {row.time}
                    </TableCell>
                    {row.dates.map((available, i) => (
                      <TableCell key={i} align="center">
                        {available ? (
                          <>
                            {isEqual(row.clickId, i) && (
                              <Button
                                variant="text"
                                sx={ButtonColor(common.white, indigo[500])}
                                onClick={() => {
                                  setDate(`${dateOptions[i + 1]} ${row.time}`)

                                  const list = [...scheduleData]
                                  list[index].clickId = i
                                  setScheduleData(list)
                                }}
                              >
                                <PanoramaFishEyeIcon />
                              </Button>
                            )}
                            {!isEqual(row.clickId, i) && (
                              <Button
                                variant="text"
                                sx={ButtonColor(indigo[500], common.white)}
                                onClick={() => {
                                  setDate(`${dateOptions[i + 1]} ${row.time}`)

                                  const list = [...scheduleData]
                                  for (const item of list) {
                                    item.clickId = -1
                                  }
                                  list[index].clickId = i
                                  setScheduleData(list)
                                }}
                              >
                                <PanoramaFishEyeIcon />
                              </Button>
                            )}
                          </>
                        ) : (
                          <ClearIcon />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

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

        <Button
          type="submit"
          variant="contained"
          sx={confirmButton}
          onClick={onSubmit}
        >
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

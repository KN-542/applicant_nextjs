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
import { DesiredAtCSR, DocumentsCSR, ReserveTableCSR } from '@/api/repository'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import {
  cloneDeep,
  every,
  filter,
  isEmpty,
  isEqual,
  map,
  size,
  some,
} from 'lodash'
import ConfirmModal from '@/components/ConfirmModal'
import { RouterPath } from '@/enum/router'
import { RootState } from '@/hooks/store/store'
import { APICommonCode } from '@/enum/apiError'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import { DesiredAtRequest } from '@/api/model'
import { ReserveTime } from '@/types/index'

const Applicant = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const RESUME = 'resume'
  const CURRICULUM_VITAE = 'curriculumVitae'
  const DAYS_COMPONENTS = 24
  const WEEKS = 14

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(null)
  const [resume, setResume] = useState(null)
  const [curriculumVitae, setCurriculumVitae] = useState(null)
  const [resumeName, setResumeName] = useState('')
  const [curriculumVitaeName, setCurriculumVitaeName] = useState('')
  const [resumeExtension, setResumeExtension] = useState('')
  const [curriculumVitaeExtension, setCurriculumVitaeExtension] = useState('')
  const [element, setElement] = useState(<></>)
  const [element2, setElement2] = useState(<></>)
  const [dates, setDates] = useState<Date[]>([])
  const [reserveTable, setReserveTable] = useState<ReserveTime[][]>([])
  const [isLoading, setIsLoading] = useState(true)

  const generateDateOptions = async () => {
    setIsLoading(true)
    const datesList: Date[] = []
    const options: ReserveTime[][] = []
    await ReserveTableCSR()
      .then((res) => {
        if (!isEqual(size(res.data.options), DAYS_COMPONENTS * WEEKS)) {
          router.push(RouterPath.Error)
          return
        }
        for (const o of map(res.data.date as string[], (item) => {
          return new Date(item)
        })) {
          datesList.push(o)
        }
        for (let i = 0; i < DAYS_COMPONENTS; i++) {
          options.push(
            map(
              filter(cloneDeep(res.data.options), (_, index: number) =>
                isEqual(index % DAYS_COMPONENTS, i),
              ),
              (option) => {
                return {
                  time: new Date(option.time),
                  isReserve: option.is_reserve,
                  isClicked: false,
                } as ReserveTime
              },
            ),
          )
        }
        setDates(datesList)
        setReserveTable(options)
        setIsLoading(false)
      })
      .catch((error) => {
        if (
          every([500 <= error.response?.status, error.response?.status < 600])
        ) {
          router.push(RouterPath.Error)
          return
        }

        if (isEqual(error.response?.data.code, APICommonCode.BadRequest)) {
          toast(t(`common.api.code.${error.response?.data.code}`), {
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

  const selectedReserve = (rIdx: number, oIdx: number) => {
    const list = cloneDeep(reserveTable)
    for (const options of list) {
      for (const option of options) {
        option.isClicked = false
      }
    }
    list[rIdx][oIdx].isClicked = !list[rIdx][oIdx].isClicked
    setReserveTable(list)
  }

  const onSubmit = () => {
    const reserve: ReserveTime = {}
    for (const options of reserveTable) {
      for (const option of options) {
        if (option.isClicked) Object.assign(reserve, option)
      }
    }

    if (isEmpty(reserve.time?.toISOString())) {
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

    setDate(reserve.time)

    setElement(
      <>
        <Typography component="h6" sx={[mb(2), Bold]}>
          {`・${t('features.main.subTitle')} `}
          <Box component="span" sx={ml(5)}>
            {`${String(reserve?.time.getMonth() + 1).padStart(2, '0')}/${String(
              reserve?.time.getDate(),
            ).padStart(2, '0')} ${String(reserve?.time.getHours()).padStart(
              2,
              '0',
            )}:${String(reserve?.time.getMinutes()).padStart(2, '0')}`}
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
      desired_at: date.toISOString(),
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
    generateDateOptions()
  }, [])

  return (
    <>
      <NextHead></NextHead>

      {!isLoading && (
        <>
          <Typography component="h3" variant="h5" sx={Title}>
            {t('features.main.title')}
          </Typography>

          <Box component="div" sx={mt(20)}>
            <Typography
              component="h3"
              variant="h5"
              sx={[SubTitle, w(90), mb(2)]}
            >
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
                      {map(dates, (o, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          sx={[minW(80), TableCellColor]}
                        >
                          {`${String(o.getMonth() + 1).padStart(
                            2,
                            '0',
                          )} / ${String(o.getDate()).padStart(2, '0')}`}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(reserveTable, (options, index) => (
                      <TableRow key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={[minW(80), TableCellColor, TableBodyCell]}
                        >
                          {`${String(options[0].time.getHours()).padStart(
                            2,
                            '0',
                          )}:${String(options[0].time.getMinutes()).padStart(
                            2,
                            '0',
                          )}`}
                        </TableCell>
                        {map(options, (option, i) => (
                          <TableCell key={i} align="center">
                            {option.isReserve ? (
                              <>
                                {option.isClicked && (
                                  <Button
                                    variant="text"
                                    sx={ButtonColor(common.white, indigo[500])}
                                  >
                                    <PanoramaFishEyeIcon />
                                  </Button>
                                )}
                                {!option.isClicked && (
                                  <Button
                                    variant="text"
                                    sx={ButtonColor(indigo[500], common.white)}
                                    onClick={() => {
                                      selectedReserve(Number(index), Number(i))
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

            <Typography
              component="h3"
              variant="h5"
              sx={[SubTitle, w(90), mb(2)]}
            >
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
                      <Box component="span">{`・${t(
                        'features.main.resume',
                      )}`}</Box>
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

export default Applicant

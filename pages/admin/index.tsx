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
import { blue, common, red } from '@mui/material/colors'
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
  FormButtons,
  LogoutButton,
  SpaceBetween,
  Top,
  TopMenu,
} from '@/styles/index'
import NextHead from '@/components/Header'
import DateRangeIcon from '@mui/icons-material/DateRange'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DragDrop from '@/components/DragDrop'
import {
  DesiredAtCSR,
  DocumentsCSR,
  LogoutCSR,
  ReserveTableCSR,
} from '@/api/repository'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import _ from 'lodash'
import ConfirmModal from '@/components/ConfirmModal'
import { RouterPath } from '@/enum/router'
import store, { RootState } from '@/hooks/store/store'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import {
  DesiredAtRequest,
  LogoutRequest,
  ReserveTableRequest,
} from '@/api/model'
import { CommonModel, ReserveTime } from '@/types/index'
import { commonDispatch, signOut } from '@/hooks/store'
import LogoutIcon from '@mui/icons-material/Logout'

const Applicant = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.user)

  const RESUME = 'resume'
  const CURRICULUM_VITAE = 'curriculumVitae'
  const DAYS_COMPONENTS = 24
  const WEEKS = 14

  const [open, isOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(null)
  const [scheduleHash, setScheduleHash] = useState<string>('')
  const [resume, setResume] = useState<File>(null)
  const [curriculumVitae, setCurriculumVitae] = useState<File>(null)
  const [resumeName, setResumeName] = useState<string>('')
  const [curriculumVitaeName, setCurriculumVitaeName] = useState<string>('')
  const [resumeExtension, setResumeExtension] = useState<string>('')
  const [curriculumVitaeExtension, setCurriculumVitaeExtension] =
    useState<string>('')
  const [element, setElement] = useState<JSX.Element>(<></>)
  const [element2, setElement2] = useState<JSX.Element>(<></>)
  const [dates, setDates] = useState<Date[]>([])
  const [reserveTable, setReserveTable] = useState<ReserveTime[][]>([])
  const [loading, isLoading] = useState(true)

  const logout = async () => {
    await LogoutCSR({ hash_key: user.hashKey } as LogoutRequest)
      .then(() => {
        store.dispatch(signOut())
        store.dispatch(
          commonDispatch({
            errorMsg: '',
          } as CommonModel),
        )
      })
      .catch(() => {
        router.push(RouterPath.Error)
      })
  }

  const generateDateOptions = async () => {
    isLoading(true)

    const datesList: Date[] = []
    const options: ReserveTime[][] = []

    // API: 予約表提示
    await ReserveTableCSR({
      hash_key: user.hashKey,
    } as ReserveTableRequest)
      .then((res) => {
        if (!_.isEqual(_.size(res.data.options), DAYS_COMPONENTS * WEEKS)) {
          router.push(RouterPath.Error)
          return
        }

        setScheduleHash(res.data.calendar_hash_key)

        const d = new Date(res.data.schedule)
        for (const o of _.map(res.data.date as string[], (item) => {
          return new Date(item)
        })) {
          datesList.push(o)
        }
        for (let i = 0; i < DAYS_COMPONENTS; i++) {
          options.push(
            _.map(
              _.filter(_.cloneDeep(res.data.options), (_a, index: number) =>
                _.isEqual(index % DAYS_COMPONENTS, i),
              ),
              (option) => {
                const time = new Date(option.time)
                return {
                  time: time,
                  isReserve: option.is_reserve,
                  isClicked: _.isEqual(d.getTime(), time.getTime()),
                } as ReserveTime
              },
            ),
          )
        }

        setDates(datesList)
        setReserveTable(options)
      })
      .catch(({ isServerError, routerPath, toastMsg }) => {
        if (isServerError) {
          router.push(routerPath)
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
      .finally(() => {
        isLoading(false)
      })
  }

  const selectedReserve = (rIdx: number, oIdx: number) => {
    const list = _.cloneDeep(reserveTable)
    const isClicked = list[rIdx][oIdx].isClicked

    for (const options of list) {
      for (const option of options) {
        option.isClicked = false
      }
    }
    list[rIdx][oIdx].isClicked = !isClicked
    setReserveTable(list)
  }

  const onSubmit = () => {
    const reserve: ReserveTime = {}
    for (const options of reserveTable) {
      for (const option of options) {
        if (option.isClicked) Object.assign(reserve, option)
      }
    }

    if (_.isEmpty(reserve.time?.toISOString())) {
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
          {!_.isEmpty(resumeName) && (
            <Box component="span" sx={[FileDisp, ml(5)]}>
              <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
              {resumeName}
            </Box>
          )}
          {_.isEmpty(resumeName) && (
            <Box component="span" sx={ml(5)}>
              {'-'}
            </Box>
          )}
        </Typography>
        <Typography component="h6" sx={[mb(2), Bold]}>
          {`・${t('features.main.curriculumVitae')} `}
          {!_.isEmpty(curriculumVitaeName) && (
            <Box component="span" sx={[FileDisp, ml(5)]}>
              <InsertDriveFileIcon sx={[mr(0.25), mb(1)]} />
              {curriculumVitaeName}
            </Box>
          )}
          {_.isEmpty(curriculumVitaeName) && (
            <Box component="span" sx={ml(5)}>
              {'-'}
            </Box>
          )}
        </Typography>
      </>,
    )

    isOpen(true)
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

    if (_.isEqual(dropArea, RESUME)) {
      setResume(file)
      setResumeName(file.name)
      setResumeExtension(file.name.substring(file.name.lastIndexOf('.') + 1))
      return
    }
    if (_.isEqual(dropArea, CURRICULUM_VITAE)) {
      setCurriculumVitae(file)
      setCurriculumVitaeName(file.name)
      setCurriculumVitaeExtension(
        file.name.substring(file.name.lastIndexOf('.') + 1),
      )
    }
  }

  const submit = async () => {
    try {
      // フォームデータ作成
      const formData = new FormData()

      if (_.some([!_.isEmpty(resumeName), !_.isEmpty(curriculumVitaeName)])) {
        formData.append('hash_key', user.hashKey)

        if (!_.isEmpty(resumeName)) {
          formData.append('resume', resume)
          formData.append('resume_extension', resumeExtension)
        }
        if (!_.isEmpty(curriculumVitaeName)) {
          formData.append('curriculum_vitae', curriculumVitae)
          formData.append(
            'curriculum_vitae_extension',
            curriculumVitaeExtension,
          )
        }

        // API: 書類アップロード
        await DocumentsCSR(formData)
      }

      // API: 希望面接日時登録
      await DesiredAtCSR({
        applicant_hash_key: user.hashKey,
        desired_at: date.toISOString(),
        title: user.name,
        resume_extension: resumeExtension,
        curriculum_vitae_extension: curriculumVitaeExtension,
      } as DesiredAtRequest)

      router.push(RouterPath.Complete)
    } catch ({ isServerError, routerPath, toastMsg }) {
      if (isServerError) {
        router.push(routerPath)
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

  useEffect(() => {
    generateDateOptions()
  }, [])

  return (
    <>
      <NextHead />

      {!loading && (
        <>
          <Box sx={[Top, SpaceBetween]}>
            <Box></Box>
            <Typography sx={Title}>{t('features.main.title')}</Typography>
            <Button
              color="inherit"
              sx={TopMenu}
              onClick={async () => {
                await logout()
                router.push(
                  RouterPath.Login.replace('[id]', '') +
                    encodeURIComponent(user.teamHashKey),
                )
              }}
            >
              <LogoutIcon sx={mr(0.25)} />
              {t('common.button.logout')}
            </Button>
          </Box>

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
                      {_.map(dates, (o, index) => (
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
                    {_.map(reserveTable, (options, index) => (
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
                        {_.map(options, (option, i) => (
                          <TableCell key={i} align="center">
                            {option.isReserve ? (
                              <Button
                                variant="text"
                                sx={
                                  option.isClicked
                                    ? ButtonColor(common.white, blue[500])
                                    : ButtonColor(blue[500], common.white)
                                }
                                onClick={() => {
                                  selectedReserve(Number(index), Number(i))
                                }}
                              >
                                <PanoramaFishEyeIcon />
                              </Button>
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
                      {!_.isEmpty(resumeName) && (
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
                      {!_.isEmpty(curriculumVitaeName) && (
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

            <Box sx={[FormButtons, mt(5), mb(5)]}>
              <Button
                variant="outlined"
                color="inherit"
                sx={LogoutButton}
                onClick={async () => {
                  await logout()
                  router.push(
                    RouterPath.Login.replace('[id]', '') +
                      encodeURIComponent(user.teamHashKey),
                  )
                }}
              >
                {t('features.login.errorButton')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={[confirmButton]}
                onClick={onSubmit}
              >
                {t('common.button.confirm')}
              </Button>
            </Box>
          </Box>

          <ConfirmModal
            open={open}
            element={element}
            element2={element2}
            submit={submit}
            cancel={() => isOpen(false)}
          ></ConfirmModal>
        </>
      )}
    </>
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

export default Applicant

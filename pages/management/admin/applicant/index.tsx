import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/hooks/store/store'
import EnhancedTable from '@/components/Table'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { ApplicantsTableBody, TableHeader } from '@/types/management'
import { useTranslations } from 'next-intl'
import { Box, Button } from '@mui/material'
import { common } from '@mui/material/colors'
import { isEmpty, isEqual, map } from 'lodash'
import {
  ApplicantStatus,
  Site,
  dispApplicantSite,
  dispApplicantStatus,
} from '@/enum/applicant'
import UploadModal from '@/components/modal/UploadModal'
import { ApplicantsDownloadRequest } from '@/api/model/management'
import { applicantsDownloadCSR, applicantsSearchCSR } from '@/api/repository'
import _ from 'lodash'
import { useRouter } from 'next/router'
import NextHead from '@/components/Header'
import { ml, mr, mt, Resume, TableMenu } from '@/styles/index'
import { RouterPath } from '@/enum/router'
import { Role } from '@/enum/user'

const Applicants = () => {
  const router = useRouter()
  const t = useTranslations()

  const user = useSelector((state: RootState) => state.management.user)
  const setting = useSelector((state: RootState) => state.management.setting)

  const [bodies, setBodies] = useState([])

  const search = () => {
    // API 応募者一覧
    const list: ApplicantsTableBody[] = []
    applicantsSearchCSR()
      .then((res) => {
        _.forEach(res.data.applicants, (r, index) => {
          list.push({
            no: Number(index) + 1,
            id: Number(r.id),
            name: r.name,
            site: Number(r.site_id),
            mail: r.email,
            age: Number(r.age),
            status: ApplicantStatus.ScheduleUnanswered, // TODO
            interviewerDate: '-', // TODO
            resume: null,
            curriculumVitae: null,
          })
        })

        setBodies(list)
      })
      .catch(() => {
        router.push(RouterPath.Error)
      })
  }

  useEffect(() => {
    search()
  }, [])

  const [open, setOpen] = useState(false)

  const readTextFile = async (file: File) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result)
        }
      }
      reader.onerror = (event) => {
        if (event.target) {
          reject(event.target.error)
        }
      }
      reader.readAsText(file, 'SHIFT-JIS') // リクナビの仕様上、SHIFT-JIS エンコーディングを指定
    })
  }
  const readFile = async (file: File) => {
    if (_.isEqual(file.type, 'text/plain')) {
      const text = String(await readTextFile(file))

      const lines = text.split('\n')
      // const header = lines[0].split(',')
      const body: string[][] = []
      _.forEach(lines, (values, index) => {
        if (index > 0) {
          const list: string[] = []
          for (const value of values.split(',')) {
            list.push(value)
          }
          body.push(list)
        }
      })
      body.pop()
      console.dir(body)

      // API通信
      const req: ApplicantsDownloadRequest = {
        values: body,
        site: Site.Recruit,
      }
      await applicantsDownloadCSR(req)
        .then(() => {
          router.reload()
          // router.push(RouterPath.Applicant) // これだと画面が固まる…
        })
        .catch(() => {
          router.push(RouterPath.Error)
        })
    } else {
      console.error('選択されたファイルはtxtファイルではありません。')
    }
  }

  const tableHeader: TableHeader[] = [
    {
      id: 1,
      name: 'No',
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 2,
      name: t('features.applicant.header.name'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 3,
      name: t('features.applicant.header.site'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 4,
      name: t('features.applicant.header.mail'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 5,
      name: t('features.applicant.header.age'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 6,
      name: t('features.applicant.header.status'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 7,
      name: t('features.applicant.header.interviewerDate'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 8,
      name: t('features.applicant.header.resume'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 9,
      name: t('features.applicant.header.curriculumVitae'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
  ]

  return (
    <>
      <NextHead></NextHead>
      <Box sx={mt(12)}>
        <Box sx={TableMenu}>
          <Button
            variant="contained"
            sx={[
              ml(1),
              {
                backgroundColor: setting.color,
                '&:hover': {
                  backgroundColor: common.white,
                  color: setting.color,
                },
              },
            ]}
            onClick={() => setBodies([])}
          >
            <ManageSearchIcon sx={mr(0.25)} />
            {t('features.applicant.search')}
          </Button>
          {isEqual(user.role, Role.Admin) && (
            <Button
              variant="contained"
              sx={[
                ml(1),
                {
                  backgroundColor: setting.color,
                  '&:hover': {
                    backgroundColor: common.white,
                    color: setting.color,
                  },
                },
              ]}
              onClick={() => setOpen(true)}
            >
              <UploadFileIcon sx={mr(0.25)} />
              {t('features.applicant.upload')}
            </Button>
          )}
        </Box>
        <EnhancedTable
          headers={tableHeader}
          bodies={map(bodies, (l) => {
            return {
              no: l.no,
              name: l.name,
              site: t(dispApplicantSite(l.site)),
              mail: l.mail,
              age: l.age,
              status: t(dispApplicantStatus(Number(l.status))),
              interviewerDate: l.interviewerDate,
              resume: isEmpty(l.resume) ? (
                <>{t('features.applicant.documents.f')}</>
              ) : (
                <Button color="primary" sx={Resume}>
                  {t('features.applicant.documents.t')}
                </Button>
              ),
              curriculumVitae: isEmpty(l.resume) ? (
                <>{t('features.applicant.documents.f')}</>
              ) : (
                <Button color="primary" sx={Resume}>
                  <UploadFileIcon sx={mr(0.25)} />
                  {t('features.applicant.documents.t')}
                </Button>
              ),
            }
          })}
          isCheckbox={true}
        />
      </Box>
      <UploadModal
        open={open}
        closeModal={() => setOpen(false)}
        afterFuncAsync={readFile}
      ></UploadModal>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Applicants

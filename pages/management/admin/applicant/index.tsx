import { useState } from 'react'
import EnhancedTable from '@/components/Table'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { ApplicantsTableBody, TableHeader } from '@/types/management'
import { useTranslations } from 'next-intl'
import { Box, Button } from '@mui/material'
import { orange } from '@mui/material/colors'
import { isEmpty, map } from 'lodash'
import {
  ApplicantStatus,
  Site,
  dispApplicantSite,
  dispApplicantStatus,
} from '@/enum/applicant'
import UploadModal from '@/components/modal/UploadModal'
import { ApplicantsDownloadRequest } from '@/api/model/management'
import { applicantsDownloadCSR, applicantsSearchSSR } from '@/api/repository'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { RouterPath } from '@/enum/router'

const Applicants = ({ list, baseUrl }) => {
  const router = useRouter()
  const t = useTranslations()

  const [bodies, setBodies] = useState(list)

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
      await applicantsDownloadCSR(baseUrl, req).then(() => {
        router.reload()
        // router.push(RouterPath.ManagementApplicant) これだと画面が固まる…
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
      name: t('management.features.applicant.header.name'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 3,
      name: t('management.features.applicant.header.site'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 4,
      name: t('management.features.applicant.header.mail'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 5,
      name: t('management.features.applicant.header.age'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 6,
      name: t('management.features.applicant.header.status'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 7,
      name: t('management.features.applicant.header.interviewerDate'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 8,
      name: t('management.features.applicant.header.resume'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 9,
      name: t('management.features.applicant.header.curriculumVitae'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
  ]

  const search = (value) => {
    // TODO API
    console.log(value)
  }
  return (
    <>
      <Box sx={{ mt: 12 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '90%',
            m: '0 auto',
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: orange[800],
              '&:hover': {
                backgroundColor: '#fff',
                color: orange[800],
              },
            }}
            onClick={() => setOpen(true)}
          >
            <UploadFileIcon sx={{ mr: 0.25 }} />
            {t('management.features.applicant.upload')}
          </Button>
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
                <>{t('management.features.applicant.documents.f')}</>
              ) : (
                <Button color="primary" sx={{ textTransform: 'none' }}>
                  {t('management.features.applicant.documents.t')}
                </Button>
              ),
              curriculumVitae: isEmpty(l.resume) ? (
                <>{t('management.features.applicant.documents.f')}</>
              ) : (
                <Button color="primary" sx={{ textTransform: 'none' }}>
                  <UploadFileIcon sx={{ mr: 0.25 }} />
                  {t('management.features.applicant.documents.t')}
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

export const getServerSideProps = async ({ locale }) => {
  const list: ApplicantsTableBody[] = []
  await applicantsSearchSSR().then((res) => {
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
  })

  return {
    props: {
      list,
      baseUrl: process.env.NEXT_CSR_URL,
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Applicants

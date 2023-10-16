import EnhancedTable from '@/components/Table'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { ApplicantsTableBody, TableHeader } from '@/types/management'
import { useTranslations } from 'next-intl'
import { Box, Button } from '@mui/material'
import { orange } from '@mui/material/colors'
import { isEmpty, map } from 'lodash'
import { ApplicantStatus, dispApplicantStatus } from '@/enum/applicant'

const Applicants = ({ list }) => {
  const t = useTranslations()

  const tableHeader: TableHeader[] = [
    {
      id: 1,
      name: t('management.features.applicant.header.name'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 2,
      name: t('management.features.applicant.header.mail'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 3,
      name: t('management.features.applicant.header.status'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 4,
      name: t('management.features.applicant.header.interviewerDate'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 5,
      name: t('management.features.applicant.header.resume'),
      sort: {
        target: false,
        isAsc: false,
      },
    },
    {
      id: 6,
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
        >
          <UploadFileIcon sx={{ mr: 0.25 }} />
          {t('management.features.applicant.upload')}
        </Button>
      </Box>
      <EnhancedTable
        headers={tableHeader}
        bodys={map(list, (l): ApplicantsTableBody => {
          return {
            name: l.name,
            mail: l.mail,
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
  )
}

export const getServerSideProps = async ({ locale }) => {
  // TODO API
  const list: ApplicantsTableBody[] = [
    {
      name: '応募者1',
      mail: 'obosya1@sample.com',
      status: ApplicantStatus.ScheduleUnanswered,
      interviewerDate: '2024/01/01',
      resume: null,
      curriculumVitae: null,
    },
    {
      name: '応募者2',
      mail: 'obosya2@sample.com',
      status: ApplicantStatus.ScheduleAnswered,
      interviewerDate: '2024/02/01',
      resume: null,
      curriculumVitae: null,
    },
    {
      name: '応募者3',
      mail: 'obosya3@sample.com',
      status: ApplicantStatus.DocumentsSubmitted,
      interviewerDate: '2024/03/01',
      resume: null,
      curriculumVitae: null,
    },
  ]

  return {
    props: {
      list,
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Applicants

import EnhancedTable from '@/components/Table'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

const Applicants = () => {
  const { t } = useTranslation('common')

  return <EnhancedTable />
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Applicants

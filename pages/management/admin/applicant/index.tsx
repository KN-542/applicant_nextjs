import EnhancedTable from '@/components/Table'
import { useTranslations } from 'next-intl'

const Applicants = () => {
  const t = useTranslations()

  return (
    <>
      <EnhancedTable />
    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/common.json`)
      ).default,
    },
  }
}

export default Applicants

export enum RouterPath {
  ManagementLogin = '/management/login',
  ManagementApplicant = '/management/admin/applicant',
  ManagementReserver = '/management/admin/reserver',
  ManagementInterviewer = '/management/admin/interviewer',
  ManagementMailTemplate = '/management/admin/mail',
  ManagementAnalysis = '/management/admin/analysis',
  ManagementHistory = '/management/admin/history',
  ManagementSetting = '/management/admin/setting',
}

export const decideTitle = (path: string) => {
  switch (path) {
    case RouterPath.ManagementLogin:
      return 'common.title.login'
    case RouterPath.ManagementApplicant:
      return 'common.title.applicant.list'
    default:
      return '404' // TODO
  }
}

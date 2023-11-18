export enum RouterPath {
  ManagementLogin = '/management/login',
  ManagementError = '/management/error',
  ManagementLoginMFA = '/management/login/mfa',
  ManagementLoginPasswordChange = '/management/login/password',
  ManagementApplicant = '/management/admin/applicant',
  ManagementReserver = '/management/admin/reserver',
  ManagementUser = '/management/admin/user',
  ManagementUserCreate = '/management/admin/user/create',
  ManagementMailTemplate = '/management/admin/mail',
  ManagementAnalysis = '/management/admin/analysis',
  ManagementHistory = '/management/admin/history',
  ManagementSetting = '/management/admin/setting',
}

export const decideTitle = (path: string) => {
  switch (path) {
    case RouterPath.ManagementLogin:
      return 'common.title.login.login'
    case RouterPath.ManagementError:
      return 'common.title.error.500'
    case RouterPath.ManagementLoginMFA:
      return 'common.title.login.login'
    case RouterPath.ManagementLoginPasswordChange:
      return 'common.title.login.login'
    case RouterPath.ManagementUser:
      return 'common.title.user.list'
    case RouterPath.ManagementUserCreate:
      return 'common.title.user.create'
    case RouterPath.ManagementApplicant:
      return 'common.title.applicant.list'
    case RouterPath.ManagementSetting:
      return 'common.title.setting.index'
    default:
      return '404' // TODO
  }
}

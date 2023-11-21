export enum RouterPath {
  Login = '/login',
  Error = '/error',
  LoginMFA = '/login/mfa',
  LoginPasswordChange = '/login/password',
  Applicant = '/admin/applicant',
  Reserver = '/admin/reserver',
  User = '/admin/user',
  UserCreate = '/admin/user/create',
  MailTemplate = '/admin/mail',
  Analysis = '/admin/analysis',
  History = '/admin/history',
  Setting = '/admin/setting',
}

export const decideTitle = (path: string) => {
  switch (path) {
    case RouterPath.Login:
      return 'common.title.login.login'
    case RouterPath.Error:
      return 'common.title.error.500'
    case RouterPath.LoginMFA:
      return 'common.title.login.login'
    case RouterPath.LoginPasswordChange:
      return 'common.title.login.login'
    case RouterPath.User:
      return 'common.title.user.list'
    case RouterPath.UserCreate:
      return 'common.title.user.create'
    case RouterPath.Applicant:
      return 'common.title.applicant.list'
    case RouterPath.Setting:
      return 'common.title.setting.index'
    default:
      return '404' // TODO
  }
}

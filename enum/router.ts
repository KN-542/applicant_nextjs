export enum RouterPath {
  Login = '/login/[id]',
  Error = '/error',
  NotFound = '/_error',
  LoginMFA = '/login/mfa',
  Main = '/admin',
  Complete = '/admin/complete',
}

export const decideTitle = (path: string) => {
  switch (path) {
    case RouterPath.Login:
      return 'common.title.login'
    case RouterPath.Error:
      return 'common.title.error.500'
    case RouterPath.NotFound:
      return 'common.title.error.404'
    case RouterPath.LoginMFA:
      return 'common.title.login'
    case RouterPath.Main:
      return 'common.title.main'
    case RouterPath.Complete:
      return 'common.title.complete'
    default:
      return '404' // TODO
  }
}

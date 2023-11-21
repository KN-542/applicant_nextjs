// ロール
export enum Role {
  Admin = 1,
  Interviewer,
}
export const dispRole = (n: number): string => {
  switch (n) {
    case Role.Admin:
      return 'features.user.role.admin'
    case Role.Interviewer:
      return 'features.user.role.interviewer'
    default:
      return 'TODO'
  }
}

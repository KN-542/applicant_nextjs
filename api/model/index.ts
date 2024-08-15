export abstract class AbstractRequest {
  abstract hash_key: string
}

// チーム存在確認
export class ConfirmTeamRequest extends AbstractRequest {
  // チームハッシュキー
  hash_key: string
}
// ログイン
export class LoginRequest {
  // メールアドレス
  email: string
  // チームハッシュキー
  team_hash_key: string
}
// MFAコード生成
export class CreateMFARequest extends AbstractRequest {
  hash_key: string
}
// ログアウト
export class LogoutRequest extends AbstractRequest {
  hash_key: string
}
// MFA
export class MFARequest extends AbstractRequest {
  hash_key: string
  code: string
}
// JWT検証
export class DecodeJWTRequest extends AbstractRequest {
  hash_key: string
}
// 面接可能日時取得
export class ReserveTableRequest extends AbstractRequest {
  hash_key: string
}
// 希望日時登録
export class DesiredAtRequest {
  // 応募者ハッシュキー
  applicant_hash_key: string
  // 希望面接日時
  desired_at: string
  // タイトル
  title: string
  // 履歴書拡張子
  resume_extension: string
  // 職務経歴書拡張子
  curriculum_vitae_extension: string
}

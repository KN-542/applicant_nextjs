export abstract class AbstractRequest {
  abstract hash_key: string
}

// ログイン
export class LoginRequest {
  email: string
}
// MFAコード生成
export class MFACreateRequest extends AbstractRequest {
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
export class JWTDdcodeRequest extends AbstractRequest {
  hash_key: string
}
// 面接可能日時取得
export class ReserveTableRequest extends AbstractRequest {
  hash_key: string
}
// 希望日時登録
export class DesiredAtRequest extends AbstractRequest {
  hash_key: string
  desired_at: string
  title: string
  calendar_hash_key: string
}

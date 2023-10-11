enum ValidationType {
  Required = 'required',
  Min = 'min',
  Max = 'max',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Pattern = 'pattern',
}

enum Pattern {
  // メールアドレス
  Mail = '^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$',
  // 半角英数字
  HalfAlphaNum = '^[0-9a-zA-Z]*$',
}

export { ValidationType, Pattern }

export default {
  data() {
    return {
      valid: false,
      rules: {
        name: [(v) => !!v || '名前は必須です'],
        email: [
          (v) => !!v || 'メールアドレスは必須です',
          (v) =>
            /.+@.+\..+/.test(v) || 'メールアドレスを正しく入力してください',
        ],
        message: [(v) => !!v || 'メッセージは必須です'],
        login_id: [
          (v) => !!v || 'ログインIDは必須です',
          (v) => v.length >= 8 || 'ログインIDは8文字以上です',
        ],
        password: [
          (v) => !!v || 'パスワードは必須です',
          (v) => v.length >= 8 || 'パスワードは8文字以上です',
        ],
        nickname: [(v) => !!v || 'ニックネームは必須です'],
        photos: [
          (v) => v.length !== 0 || '画像を選択してください',
          (v) => v.length <= 6 || '画像は6枚以上は投稿できません',
        ],
        msg: [(v) => v.length <= 30 || '30文字以内に収めてください'],
      },
    }
  },
}

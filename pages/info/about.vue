<template>
  <base-container>
    <v-card-title><b>このアプリについて(注意事項)</b></v-card-title>
    <v-card-text>
      <h2 class="mt-5 mb-3">機能制限</h2>
      <p>このアプリはβ版として公開しており機能制限しています。</p>
      <ol>
        <li>
          <u>アルバム作成機能</u>
          <ul>
            <li>
              実装検討中です。現時点の運営方針としてはお問い合わせがあり次第ユーザを作成していく予定なのでご連絡ください。
            </li>
          </ul>
        </li>
        <li>
          <u>削除機能</u>
          <ul>
            <li>
              今回なるべく手軽に使用していただくために、ユーザが個別で登録する機能を省いております。<br />
              そのため画像削除がユーザ個人で出来ません。利用規約を参照いただき、節度を持った投稿にご協力ください。<br />
              また、削除依頼をしていただくと速やかに運営が投稿を削除致しますのでお気軽に削除依頼をお願いいたします。
            </li>
          </ul>
        </li>
        <li>
          機能追加の要望などのご要望がありましたらお問い合わせ窓口より受け付けております。
        </li>
      </ol>

      <h2 class="mt-5 mb-3">お問い合わせ窓口</h2>
      <p>
        <NuxtLink to="/info/contact/">お問い合わせフォーム</NuxtLink>
        <br />
        HP：
        <a
          href="https://taiga-tech.tk/info/contact/"
          target="_blank"
          rel="noopener"
        >
          https://taiga-tech.tk/info/contact/
        </a>
        <br />
        Eメールアドレス：taiga.dev.n@gmail.com
        <br />
        Twitte：<a
          href="https://twitter.com/Taiga_dev/"
          target="_blank"
          rel="noopener"
          >@Taiga_dev</a
        >
      </p>
      <p align="right">以上</p>
    </v-card-text>
  </base-container>
</template>

<script>
import Meta from '~/assets/mixins/Meta'

export default {
  components: { BaseContainer: () => import('~/components/Base/Container') },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: 'このアプリについて(注意事項)',
      },
    }
  },
}
</script>

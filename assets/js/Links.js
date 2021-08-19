import {
  mdiApps,
  mdiAlphaDBoxOutline,
  mdiGithub,
  mdiNote,
  mdiEmail,
} from '@mdi/js'

export const links = [
  {
    icon: mdiApps,
    title: 'トップ',
    to: '/',
  },
  {
    // "icon": "mdi-alpha-d-box-outline",
    icon: mdiAlphaDBoxOutline,
    title: 'デモ',
    to: '/demo/',
  },
  {
    icon: mdiGithub,
    title: '作成者について',
    to: '/info/',
  },
  {
    icon: mdiNote,
    title: '利用規約',
    to: '/info/terms/',
  },
  {
    icon: mdiNote,
    title: 'プライバシーポリシー',
    to: '/info/privacy/',
  },
  {
    icon: mdiEmail,
    title: 'お問い合わせ',
    to: '/info/contact/',
  },
]

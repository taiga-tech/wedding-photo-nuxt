export default {
  head() {
    return {
      titleTemplate: '%s - Wedding Photo Album',
      title: this.meta.title,

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
            ? this.meta.description
            : 'Wedding Photo Album みんなでひとつだけのフォトアルバム',
        },

        // ogp
        // { hid: 'og:type', property: 'og:type', content: this.meta.type },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title + ' - Wedding Photo Album',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description
            ? this.meta.description
            : 'Wedding Photo Album みんなでひとつだけのフォトアルバム',
        },
        // {
        //   hid: 'og:url',
        //   property: 'og:url',
        //   content: `${process.env.APP_URL}${this.currentPageForCanonical}`,
        // },
        // { hid: 'og:image', property: 'og:image', content: this.meta.image },
      ],
    }
  },
}

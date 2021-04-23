export default {
  methods: {
    swipe(direction) {
      if (this.modalsrc.photos.length === 1) {
        console.log('だめー')
        return false
      }
      if (direction === 1) {
        if (this.pullIndex + 1 < this.modalsrc.photos.length) {
          console.log('up')
          this.pullIndex = direction + this.pullIndex
        } else {
          console.log('だめー')
          return false
        }
      }
      if (direction === -1) {
        if (this.pullIndex !== 0) {
          console.log('down')
          this.pullIndex = direction + this.pullIndex
        } else {
          console.log('だめー')
          return false
        }
      }
    },
  },
}

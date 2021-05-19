import Vue from 'vue'
import Rollbar from 'rollbar'

// Set the Rollbar instance in the Vue prototype
// before creating the first Vue instance.
// This ensures it is available in the same way for every
// instance in your app.
Vue.prototype.$rollbar = new Rollbar({
  accessToken: 'ea05fb9577a04fef90551a16677c7585',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// If you have already set up a global error handler,
// just add `vm.$rollbar.error(err)` to the top of it.
// If not, this simple example will preserve the app’s existing
// behavior while also reporting uncaught errors to Rollbar.
Vue.config.errorHandler = (err, vm, info) => {
  vm.$rollbar.error(err)
  throw err // rethrow
}

// Create the Vue app instance after adding the Rollbar
// instance to the Vue prototype above.
// Your app may pass different options here.
// new Vue({
//   render: (h) => h(App),
// }).$mount('#app')

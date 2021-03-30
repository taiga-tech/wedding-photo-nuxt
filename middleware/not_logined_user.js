export default function ({ store, redirect, route }) {
  if (!store.state.auth.authUser && route.path !== '/login') {
    redirect('/login')
  }
}

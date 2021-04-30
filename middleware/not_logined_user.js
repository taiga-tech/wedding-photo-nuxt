export default function ({ store, redirect, route }) {
  if (!store.state.auth.authUser && route.name !== 'login') {
    redirect('/login/')
  }
}

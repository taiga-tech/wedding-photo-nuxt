export default function ({ store, redirect, route }) {
  if (
    store.state.auth.authUser &&
    route.params.roomId === String(store.state.auth.authUser.id)
  ) {
    return false
  } else if (
    store.state.auth.authUser &&
    route.params.roomId !== String(store.state.auth.authUser.id)
  ) {
    redirect('/room/' + String(store.state.auth.authUser.id) + '/')
  }
}

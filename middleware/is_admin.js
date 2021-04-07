export default function ({ store, redirect, route }) {
  if (store.state.auth.authUser && store.state.auth.authUser.role === 1) {
    if (route.name !== 'admin') {
      redirect('/admin/')
    }
  } else if (route.params.roomId !== String(store.state.auth.authUser.id)) {
    redirect('/room/' + store.state.auth.authUser.id + '/')
  }
}

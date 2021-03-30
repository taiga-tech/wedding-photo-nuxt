export default function ({ redirect, route }) {
  const isMaintenance = process.env.MAINTENANCE_MODE

  if (
    isMaintenance === 'true' &&
    (route.name === 'index' ||
      route.name === 'info' ||
      route.name === 'info-contact')
  ) {
    return false
  } else if (isMaintenance === 'true' && route.name !== 'maintenance') {
    redirect('/maintenance/')
  }

  if (isMaintenance === 'false' && route.name === 'maintenance') {
    redirect('/')
  }
}

export const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  if ([ 'light', 'dark' ].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
  if (userMedia.matches) return 'dark'

  return 'light'
}
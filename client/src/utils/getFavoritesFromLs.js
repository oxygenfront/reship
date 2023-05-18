export const getFavoritesFromLs = (data) => {
  const ls = localStorage.getItem('favorites')

  const favorites = ls ? data : []
  return {
    favorites,
  }
}

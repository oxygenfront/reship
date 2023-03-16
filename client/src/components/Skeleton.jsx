import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => {
  return (
    <ContentLoader
      speed={1.5}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f2f2f2"
      foregroundColor="#7db3ed"
    >
      <rect x="10" y="297" rx="4" ry="4" width="91" height="17" />
      <rect x="10" y="336" rx="6" ry="6" width="164" height="15" />
      <rect x="2" y="0" rx="14" ry="14" width="282" height="282" />
      <rect x="8" y="365" rx="10" ry="10" width="96" height="32" />
      <rect x="118" y="366" rx="10" ry="10" width="117" height="32" />
      <circle cx="266" cy="382" r="16" />
    </ContentLoader>
  )
}

export default Skeleton

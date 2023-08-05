import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = ({ view }) => {
  return view === 'grid' ? (
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
  ) : (
    <ContentLoader
      speed={1.5}
      width={834}
      height={292}
      viewBox="0 0 834 242"
      backgroundColor="#f2f2f2"
      foregroundColor="#7db3ed"
    >
      <rect x="0" y="0" rx="14" ry="14" width="300" height="242" />
      <rect x="14" y="314" rx="10" ry="10" width="88" height="32" />
      <rect x="155" y="315" rx="10" ry="10" width="118" height="32" />
      <rect x="353" y="6" rx="13" ry="13" width="152" height="35" />
      <rect x="359" y="82" rx="7" ry="7" width="140" height="13" />
      <rect x="359" y="108" rx="7" ry="7" width="140" height="13" />
      <rect x="359" y="136" rx="7" ry="7" width="140" height="13" />
      <rect x="652" y="96" rx="14" ry="14" width="106" height="38" />
      <rect x="526" y="220" rx="0" ry="0" width="7" height="0" />
      <rect x="652" y="12" rx="7" ry="7" width="89" height="29" />
    </ContentLoader>
  )
}

export default Skeleton

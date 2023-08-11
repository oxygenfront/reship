import React, { useState } from 'react'
import styles from './AdminCreate.module.sass'
import { BsPlusCircle } from 'react-icons/bs'
import FeatureItem from './FeatureItem'

const FeatureBlock = ({ parsedFeatures }) => {
  const [features, setFeatures] = useState(
    parsedFeatures.map((feature) => {
      return {
        id: Math.random(),
        title: feature.title,
        desc: feature.desc,
        isEditing: true,
      }
    })
  )
  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        id: Math.random(),
        title: '',
        desc: '',
        isEditing: true,
      },
    ])
  }

  return (
    <div className={styles.feature}>
      <div className={styles.feature_title}>Особенности</div>
      <div className={styles.feature_add_wrapper}>
        <button className={styles.feature_add} onClick={handleAddFeature}>
          <BsPlusCircle />
        </button>
      </div>
      <div className={styles.feature_wrapper}>
        {features &&
          features?.map((feature) => (
            <FeatureItem
              key={feature.id}
              setFeatures={setFeatures}
              feature={feature}
            />
          ))}
      </div>
    </div>
  )
}

export default FeatureBlock

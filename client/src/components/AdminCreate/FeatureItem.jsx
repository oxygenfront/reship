import classNames from 'classnames'
import styles from './AdminCreate.module.sass'
import { RxCrossCircled } from 'react-icons/rx'
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai'

function FeatureItem({ feature, setFeatures }) {
  const handleChangeFeatures = (event) => {
    const { name, value, id } = event.target
    setFeatures((prevFeatures) => {
      return prevFeatures.map((prevFeature) =>
        Number(prevFeature.id) === Number(id)
          ? { ...prevFeature, [name]: value }
          : prevFeature
      )
    })
  }

  const handleDeleteFeatures = (id) => {
    const deletedFeature = feature.filter((parameter) => parameter.id !== id)
    setFeatures(deletedFeature)
  }

  const handleEditingFeatures = (id) => {
    const updatedFeatures = feature.map((feature) => {
      if (feature.id === id) {
        return { ...feature, isEditing: true }
      }
      return feature
    })
    setFeatures(updatedFeatures)
  }
  return (
    <div className={styles.feature_item}>
      {feature.isEditing ? (
        <>
          <input
            id={feature.id}
            onChange={handleChangeFeatures}
            value={feature.title || ''}
            name="title"
            placeholder="Название особенности"
            className={classNames(styles.feature_item_top, styles.input)}
          />
          <textarea
            id={feature.id}
            value={feature.desc || ''}
            onChange={handleChangeFeatures}
            name="desc"
            placeholder="Описание особенности"
            className={classNames(styles.feature_item_bottom, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.feature_item_top}>
            {feature.title || 'Название особенности'}
          </div>
          <div className={styles.feature_item_bottom}>
            {feature.desc || 'Описание особенности'}
          </div>
          <div className={styles.feature_item_buttons}>
            <button onClick={() => handleDeleteFeatures(feature.id)}>
              <RxCrossCircled />
            </button>
            <button onClick={() => handleEditingFeatures(feature.id)}>
              <AiOutlineEdit />
            </button>
          </div>
        </>
      )}
      {feature.isEditing ? (
        <button
          onClick={() => {
            setFeatures((prevFeatures) => {
              const updatedFeatures = prevFeatures.map((prevFeature) => {
                if (prevFeature.id === feature.id) {
                  return {
                    ...prevFeature,
                    isEditing: !prevFeature.isEditing,
                  }
                }
                return prevFeature
              })
              return updatedFeatures
            })
          }}
        >
          <AiOutlineCheckCircle />
        </button>
      ) : null}
    </div>
  )
}

export default FeatureItem

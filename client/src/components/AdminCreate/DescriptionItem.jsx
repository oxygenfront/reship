import classNames from 'classnames'
import styles from './AdminCreate.module.sass'
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai'
import { useState } from 'react'

function DescriptionItem({ newItem, setNewItem, propsValue, dataChange }) {
  const [description, setDescription] = useState({
    id: Math.random(),
    desc: dataChange?.description_full || '',
    isEditing: true,
  })
  const handleChangeDescription = (event) => {
    setNewItem({
      ...newItem,
      description_full: event.target.value,
    })
  }

  const handleEditingDescription = () => {
    setDescription((prevDesc) => ({
      ...prevDesc,
      isEditing: true,
    }))
  }

  return (
    <div className={styles.description}>
      <div className={styles.description_title}>Полное описание товара</div>
      <div className={styles.description_wrapper}>
        {description.isEditing ? (
          <>
            <textarea
              id={description.id}
              onChange={handleChangeDescription}
              value={propsValue || description.desc || ''}
              name="desc"
              placeholder="Полное описание"
              className={classNames(styles.description_item, styles.input)}
            />
          </>
        ) : (
          <>
            <div className={styles.description_item}>
              {propsValue || description.desc || 'Описание'}
            </div>

            <div className={styles.description_item_buttons}>
              <button onClick={handleEditingDescription}>
                <AiOutlineEdit />
              </button>
            </div>
          </>
        )}
        {description.isEditing ? (
          <button
            onClick={() => {
              setDescription((prevDescription) => ({
                ...prevDescription,
                isEditing: !prevDescription.isEditing,
              }))
            }}
          >
            <AiOutlineCheckCircle />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default DescriptionItem

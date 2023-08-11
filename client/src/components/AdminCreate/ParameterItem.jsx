import classNames from 'classnames'
import styles from './AdminCreate.module.sass'
import { RxCrossCircled } from 'react-icons/rx'
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai'

function ParameterItem({ parameter, setParameters }) {
  const handleChangeParameter = (event) => {
    const { name, value, id } = event.target
    setParameters((prevParameters) => {
      return prevParameters.map((prevParameter) =>
        Number(prevParameter.id) === Number(id)
          ? { ...prevParameter, [name]: value }
          : prevParameter
      )
    })
  }

  const handleDeleteParameter = (id) => {
    setParameters((prevParameters) =>
      prevParameters.filter((parameter) => parameter.id !== id)
    )
  }

  const handleEditingParameter = (id) => {
    setParameters((prevParameters) =>
      prevParameters.map((parameter) =>
        parameter.id === id ? { ...parameter, isEditing: true } : parameter
      )
    )
  }
  return (
    <div className={styles.parameters_item}>
      {parameter.isEditing ? (
        <>
          <input
            id={parameter.id}
            onChange={handleChangeParameter}
            value={parameter.title || ''}
            name="title"
            placeholder="Имя характеристики"
            className={classNames(styles.parameters_item_left, styles.input)}
          />
          <input
            id={parameter.id}
            value={parameter.desc || ''}
            onChange={handleChangeParameter}
            name="desc"
            placeholder="Описание"
            className={classNames(styles.parameters_item_right, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.parameters_item_left}>
            {parameter.title || 'Навзание'}
          </div>
          <div className={styles.parameters_item_right}>
            {parameter.desc || 'Описание'}
          </div>
          <div className={styles.parameters_item_buttons}>
            <button onClick={() => handleDeleteParameter(parameter.id)}>
              <RxCrossCircled />
            </button>
            <button onClick={() => handleEditingParameter(parameter.id)}>
              <AiOutlineEdit />
            </button>
          </div>
        </>
      )}
      {parameter.isEditing ? (
        <button
          onClick={() => {
            setParameters((prevParameters) => {
              const updatedParameters = prevParameters.map((prevParameter) => {
                if (prevParameter.id === parameter.id) {
                  return {
                    ...prevParameter,
                    isEditing: !prevParameter.isEditing,
                  }
                }
                return prevParameter
              })
              return updatedParameters
            })
          }}
        >
          <AiOutlineCheckCircle />
        </button>
      ) : null}
    </div>
  )
}

export default ParameterItem

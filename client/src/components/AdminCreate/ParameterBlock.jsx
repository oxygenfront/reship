import React, { useState } from 'react'
import ParameterItem from './ParameterItem'
import styles from './AdminCreate.module.sass'
import { BsPlusCircle } from 'react-icons/bs'

const ParameterBlock = ({ parsedParameters }) => {
  const [parameters, setParameters] = useState(
    parsedParameters.map((parameter) => {
      return {
        id: Math.random(),
        title: parameter.title,
        desc: parameter.desc,
        isEditing: true,
      }
    })
  )
  const handleAddParameter = () => {
    setParameters((prevParameters) => [
      ...prevParameters,
      {
        id: Math.random(),
        value1: '',
        value2: '',
        isEditing: true,
      },
    ])
  }

  return (
    <div className={styles.parameters}>
      <div className={styles.parameters_title}>Характеристики</div>
      <div className={styles.parameters_add_wrapper}>
        <button className={styles.parameters_add} onClick={handleAddParameter}>
          <BsPlusCircle />
        </button>
      </div>
      <div className={styles.parameters_wrapper}>
        {parameters.map((parameter) => (
          <ParameterItem
            key={parameter.id}
            parameter={parameter}
            setParameters={setParameters}
          />
        ))}
      </div>
    </div>
  )
}

export default ParameterBlock

import { useEffect, useState } from 'react'
import styles from './Error.module.sass'
import classnames from 'classnames'
function Error({ children, isErrorProp }) {
  const [isError, setIsError] = useState(isErrorProp)

  useEffect(() => {
    setIsError(isErrorProp)
  }, [isErrorProp])

  console.log(isError)

  return (
    <div
      onClick={() => setIsError(false)}
      className={
        isError ? classnames(styles.error, styles.active) : styles.error
      }
    >
      <div className={styles.error_wrapper}>
        <span>{children}</span>
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Error

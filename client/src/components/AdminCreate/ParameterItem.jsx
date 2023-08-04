import classNames from 'classnames';
import styles from './AdminCreate.module.sass';

function ParameterItem({ props, onChange, onConfirm }) {
  return (
    <>
      {props.isEditing ? (
        <>
          <input
            id={props.id}
            onChange={onChange}
            name='value1'
            placeholder='Имя характеристики'
            className={classNames(styles.parameters_item_left, styles.input)}
          />
          <input
            id={props.id}
            onChange={onChange}
            name='value2'
            placeholder='Описание'
            className={classNames(styles.parameters_item_right, styles.input)}
          />
          {/* {props.isEditing ? (
            <button onClick={onConfirm(props.id)}>Подтвердить</button>
          ) : null} */}
        </>
      ) : (
        <>
          <div className={styles.parameters_item_left}>{props.value1}</div>
          <div className={styles.parameters_item_right}>{props.value2}</div>
        </>
      )}
    </>
  );
}

export default ParameterItem;

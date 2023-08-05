import classNames from 'classnames';
import styles from './AdminCreate.module.sass';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineEdit } from 'react-icons/ai';

function ParameterItem({ props, onChange, onDelete, onEditing }) {
  return (
    <>
      {props.isEditing ? (
        <>
          <input
            id={props.id}
            onChange={onChange}
            value={props.value1 || ''}
            name='value1'
            placeholder='Имя характеристики'
            className={classNames(styles.parameters_item_left, styles.input)}
          />
          <input
            id={props.id}
            value={props.value2 || ''}
            onChange={onChange}
            name='value2'
            placeholder='Описание'
            className={classNames(styles.parameters_item_right, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.parameters_item_left}>
            {props.value1 || 'Навзание'}
          </div>
          <div className={styles.parameters_item_right}>
            {props.value2 || 'Описание'}
          </div>
          <div className={styles.parameters_item_buttons}>
            <button onClick={() => onDelete(props.id)}>
              <RxCrossCircled />
            </button>
            <button onClick={() => onEditing(props.id)}>
              <AiOutlineEdit />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ParameterItem;

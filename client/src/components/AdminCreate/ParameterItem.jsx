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
            value={props.title || ''}
            name='title'
            placeholder='Имя характеристики'
            className={classNames(styles.parameters_item_left, styles.input)}
          />
          <input
            id={props.id}
            value={props.desc || ''}
            onChange={onChange}
            name='desc'
            placeholder='Описание'
            className={classNames(styles.parameters_item_right, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.parameters_item_left}>
            {props.title || 'Навзание'}
          </div>
          <div className={styles.parameters_item_right}>
            {props.desc || 'Описание'}
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

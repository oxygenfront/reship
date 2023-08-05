import classNames from 'classnames';
import styles from './AdminCreate.module.sass'
import { AiOutlineEdit } from 'react-icons/ai';

function DescriptionItem({ props, onChange, onEditing }) {
  
  return (
    <>
      {props.isEditing ? (
        <>
          <textarea
            id={props.id}
            onChange={onChange}
            value={props.desc || ''}
            name='desc'
            placeholder='Описание'
            className={classNames(styles.description_item, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.description_item}>
            {props.desc || 'Описание'}
          </div>
          
          <div className={styles.description_item_buttons}>
            <button onClick={onEditing}>
              <AiOutlineEdit />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default DescriptionItem;
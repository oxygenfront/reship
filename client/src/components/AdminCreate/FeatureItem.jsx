import classNames from 'classnames';
import styles from './AdminCreate.module.sass';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineEdit } from 'react-icons/ai';

function FeatureItem({ props, onChange, onDelete, onEditing }) {
  
  return (
    <>
      {props.isEditing ? (
        <>
          <input
            id={props.id}
            onChange={onChange}
            value={props.title || ''}
            name='title'
            placeholder='Название особенности'
            className={classNames(styles.feature_item_top, styles.input)}
          />
          <textarea
            id={props.id}
            value={props.desc || ''}
            onChange={onChange}
            name='desc'
            placeholder='Описание особенности'
            className={classNames(styles.feature_item_bottom, styles.input)}
          />
        </>
      ) : (
        <>
          <div className={styles.feature_item_top}>
            {props.title || 'Название особенности'}
          </div>
          <div className={styles.feature_item_bottom}>
            {props.desc || 'Описание особенности'}
          </div>
          <div className={styles.feature_item_buttons}>
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

export default FeatureItem;

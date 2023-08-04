import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchNewItem } from '../../redux/slices/adminSlice';
import { selectUserData } from '../../redux/slices/authSlice';
import styles from './AdminCreate.module.sass';
import { BsPlusCircle } from 'react-icons/bs';
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  availableOptions,
  brandsAccessory,
  brandsCover,
  brandsHeadphones,
  brandsKeyboards,
  brandsKeycap,
  brandsMicrophone,
  brandsMouse,
  brandsWebCam,
  categoryOptions,
  colorsMouse,
  layoutKeyboards,
  platesKeyboards,
  switchesKeyboard,
} from './optionsData';
import ParameterItem from './ParameterItem';
const AdminCreate = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector(selectUserData);
  const token = localStorage.getItem('token');
  const initialState = {
    name: '',
    brand: '',
    description_small: '',
    description_full: '',
    old_price: '',
    price: '',
    availability: availableOptions[0],
    color: '',
    colors_avail: '',
    parameters: '',
    parameters_avail: '',
    image_links: [],
    category: categoryOptions[0],
    token: token,
  };
  const [newItem, setNewItem] = useState(initialState);
  const [parameters, setParameters] = useState([
    {
      id: Math.random(),
      value1: '',
      value2: '',
      isEditing: true,
    },
  ]);
  const [height, setHeight] = useState(38);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  useEffect(() => {
    if (status === 'success' && data !== null && data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }, [status, data]);
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', '835dbdbb109ca2b4323a35bd10d9d6bc');
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData
      );
      const imageURL = response.data.data.url;
      setNewItem((prevNewItem) => ({
        ...prevNewItem,
        image_links: [...prevNewItem.image_links, imageURL],
      }));
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevNewItem) => ({
      ...prevNewItem,
      [name]: value,
    }));
    setHeight(`${event.target.scrollHeight}px`);
  };
  const handleSelectChange = (name, value) => {
    setNewItem((prevNewItem) => ({
      ...prevNewItem,
      [name]: value,
    }));
  };
  const handleCreatableSelectChange = (name, value) => {
    setNewItem((prevNewItem) => ({
      ...prevNewItem,
      [name]: value,
    }));
  };
  const sendForm = async (e) => {
    e.preventDefault();
    const response = await dispatch(fetchNewItem(newItem));
    if (!response.payload) {
      alert('Не удалось создать товар');
    } else {
      setNewItem(initialState);
    }
  };
  const handleAddParameter = () => {
    setParameters([
      ...parameters,
      {
        id: Math.random(),
        value1: '',
        value2: '',
        isEditing: true,
      },
    ]);
  };
  const handleChangeParameter = (event) => {
    const { name, value, id } = event.target;
    setParameters((prevParameters) => {
      const updatedParameters = prevParameters.map((prevParameter) => {
        if (Number(prevParameter.id) === Number(id)) {
          return {
            ...prevParameter,
            [name]: value,
          };
        }
        return prevParameter;
      });
      return updatedParameters;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.upload_photos_wrapper}>
        <p className={styles.upload_photos_title}>Загрузка фотографий товара</p>
        <div className={styles.upload_photos}>
          {newItem.image_links?.map((imageURL, index) => (
            <a href={imageURL} target='_blank' rel='noreferrer' key={index}>
              <img
                src={imageURL}
                alt={`Загруженное изображение ${index}`}
                className={styles.uploaded_photo}
              />
            </a>
          ))}
          <div className={styles.upload_photo_btn}>
            <input
              type='file'
              className={styles.upload_photo}
              placeholder=''
              onChange={handleFileChange}
            />
            <BsPlusCircle />
          </div>
        </div>
      </div>
      <div className={styles.info_item}>
        <input
          type='text'
          name='name'
          value={newItem.name}
          onChange={handleChange}
          placeholder='Введите название товара'
          className={styles.info_item_input}
        />
        <input
          type='text'
          name='price'
          value={newItem.price}
          onChange={handleChange}
          placeholder='Введите цену товара'
          className={styles.info_item_input}
        />
        <textarea
          type='text'
          name='description_small'
          value={newItem.description_small}
          onChange={handleChange}
          style={{ height }}
          placeholder='Введите краткое описание товара'
          className={styles.info_item_input}
        />
        <textarea
          type='text'
          name='description_full'
          value={newItem.description_full}
          onChange={handleChange}
          style={{ height }}
          placeholder='Введите полное описание товара'
          className={styles.info_item_input}
        />
        <CreatableSelect
          className='basic-single'
          classNamePrefix='select'
          defaultValue={categoryOptions[0]}
          isClearable={isClearable}
          onChange={(event) => handleSelectChange('category', event.value)}
          isSearchable={isSearchable}
          name='category'
          options={categoryOptions}
        />
        {newItem.category === 'Мышки' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд мышки или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsMouse}
            />
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              isMulti
              placeholder='Выберите цвет мышки или введите цвет которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('color', event.value)
              }
              isSearchable={isSearchable}
              name='color'
              options={colorsMouse}
            />
          </>
        ) : newItem.category === 'Клавиатуры' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд клавиатуры или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsKeyboards}
            />
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите цвет клавиатуры или введите цвет которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('color', event.value)
              }
              isSearchable={isSearchable}
              name='color'
              options={colorsMouse}
            />
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              isMulti
              placeholder='Выберите раскладку клавиатуры или введите раскладку которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('layout', event.value)
              }
              isSearchable={isSearchable}
              name='layout'
              options={layoutKeyboards}
            />
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите свитчи клавиатуры или введите свитчи которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('switches', event.value)
              }
              isSearchable={isSearchable}
              name='switches'
              options={switchesKeyboard}
            />
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите материал платы клавиатуры или введите материал платы которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('plate', event.value)
              }
              isSearchable={isSearchable}
              name='plate'
              options={platesKeyboards}
            />
          </>
        ) : newItem.category === 'Наушники' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд наушников или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsHeadphones}
            />
          </>
        ) : newItem.category === 'Микрофоны' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд микрофона или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsMicrophone}
            />
          </>
        ) : newItem.category === 'Аксессуары' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд аксессуара или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsAccessory}
            />
          </>
        ) : newItem.category === 'Кейкапы' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд кейкапов или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsKeycap}
            />
          </>
        ) : newItem.category === 'Коврики' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд коврика или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsCover}
            />
          </>
        ) : newItem.category === 'Веб-камеры' ? (
          <>
            <CreatableSelect
              className='basic-single'
              classNamePrefix='select'
              placeholder='Выберите бренд веб-камеры или введите бренд которого нет в списке'
              isClearable={isClearable}
              onChange={(event) =>
                handleCreatableSelectChange('brand', event.value)
              }
              isSearchable={isSearchable}
              name='brand'
              options={brandsWebCam}
            />
          </>
        ) : null}
        <Select
          className='basic-single'
          classNamePrefix='select'
          defaultValue={availableOptions[0]}
          isClearable={isClearable}
          onChange={(event) => handleSelectChange('availability', event.value)}
          isSearchable={isSearchable}
          name='availability'
          options={availableOptions}
        />
      </div>
      <div className={styles.parameters}>
        <div className={styles.parameters_title}>Характеристики</div>
        <div className={styles.parameters_wrapper}>
          {parameters.map((parameter) => (
            <div className={styles.parameters_item}>
              <ParameterItem
                props={parameter}
                onChange={handleChangeParameter}
              />
              {parameter.isEditing ? (
                <button
                  onClick={() => {
                    setParameters((prevParameters) => {
                      const updatedParameters = prevParameters.map(
                        (prevParameter) => {
                          if (prevParameter.id === parameter.id) {
                            return {
                              ...prevParameter,
                              isEditing: !prevParameter.isEditing,
                            };
                          }
                          return prevParameter;
                        }
                      );
                      return updatedParameters;
                    });
                  }}
                >
                  Подтвердить
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div className={styles.parameters_add_wrapper}>
          <button
            className={styles.parameters_add}
            onClick={handleAddParameter}
          >
            <BsPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminCreate;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { fetchNewItem } from '../../redux/slices/adminSlice';
import { selectUserData } from '../../redux/slices/authSlice';
import styles from './AdminCreate.module.sass';
import DescriptionItem from './DescriptionItem';
import FeatureItem from './FeatureItem';
import ParameterItem from './ParameterItem';
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
  tickets,
} from './optionsData';
const AdminCreateChange = ({ propsItem }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const dataChange = propsItem.props;

  const parsedParametersDop = dataChange?.parameters_dop
    ? JSON.parse(dataChange?.parameters_dop)
    : null || [
        {
          plates: [{}],
        },
        {
          switches: [{}],
        },
        {
          layouts: [{}],
        },
      ];

  const [[[platesParsedParametersDop]]] = parsedParametersDop.map((obj) =>
    obj.plates?.map((plateParam) => {
      const keys = Object.keys(plateParam);
      return keys;
    })
  );
  // console.log(parsedParametersDop.map((obj) => console.log(obj.switches)));
  // const switchesParsedParametersDop = parsedParametersDop?.switches?.map(
  //   (obj) => console.log(obj)

  //   // obj.switches?.map((switchParam) => {
  //   //   const keys = Object.keys(switchParam);
  //   //   return keys;
  //   // })
  // );

  // console.log(switchesParsedParametersDop);

  const parsedFeatures = dataChange?.feature
    ? JSON.parse(dataChange?.feature)
    : null || [
        {
          id: Math.random(),
          title: '',
          desc: '',
          isEditing: true,
        },
      ];
  const parsedParameters = dataChange?.parameters
    ? JSON.parse(dataChange?.parameters)
    : null || [
        {
          id: Math.random(),
          title: '',
          desc: '',
          isEditing: true,
        },
      ];

  const parsedImage = dataChange?.image_link
    ? JSON.parse(dataChange?.image_link)
    : null || [];
  const dispatch = useDispatch();
  const { data, status } = useSelector(selectUserData);
  const token = localStorage.getItem('token');
  const initialState = {
    name: dataChange?.name || '',
    brand: dataChange?.brand || '',
    features: parsedFeatures,
    description_small: dataChange?.description_small || '',
    description_full: dataChange?.description_full || '',
    old_price: dataChange?.old_price || '',
    price: dataChange?.price || '',
    availability: dataChange?.availability || availableOptions[0],
    color: dataChange?.color || '',
    colors_avail: dataChange?.colors_avail || '',
    parameters: parsedParameters,
    parameters_avail: dataChange?.parameters_avail || '',
    parameters_dop: parsedParametersDop,
    type: dataChange?.type || '',
    image_links: parsedImage,
    weight: dataChange?.weight || '',
    category: dataChange?.category || categoryOptions[0].value,
    token: token,
  };
  const [newItem, setNewItem] = useState(initialState);
  const [parameters, setParameters] = useState(
    parsedParameters.map((parameter) => {
      return {
        id: Math.random(),
        title: parameter.title,
        desc: parameter.desc,
        isEditing: true,
      };
    })
  );
  const [features, setFeatures] = useState(
    parsedFeatures.map((feature) => {
      return {
        id: Math.random(),
        title: feature.title,
        desc: feature.desc,
        isEditing: true,
      };
    })
  );
  const [description, setDescription] = useState({
    id: Math.random(),
    desc: dataChange?.description_full || '',
    isEditing: true,
  });
  const [height, setHeight] = useState(38);
  const [isClearable] = useState(true);
  const [isSearchable] = useState(true);

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

  // Реализовать удаление фотографии
  const handleDeleteImage = (id) => {};

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

  const handleChangeParameter = async (event) => {
    const { name, value, id } = event.target;
    await setParameters((prevParameters) => {
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

  const handleDeleteParameter = (id) => {
    const deletedParameter = parameters.filter(
      (parameter) => parameter.id !== id
    );
    setParameters(deletedParameter);
  };

  const handleEditingParameter = (id) => {
    const updatedParameters = parameters.map((parameter) => {
      if (parameter.id === id) {
        return { ...parameter, isEditing: true };
      }
      return parameter;
    });
    setParameters(updatedParameters);
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        id: Math.random(),
        title: '',
        desc: '',
        isEditing: true,
      },
    ]);
  };

  const handleChangeFeatures = async (event) => {
    const { name, value, id } = event.target;
    await setFeatures((prevFeatures) => {
      const updatedFeatures = prevFeatures.map((prevFeatures) => {
        if (Number(prevFeatures.id) === Number(id)) {
          return {
            ...prevFeatures,
            [name]: value,
          };
        }
        return prevFeatures;
      });

      return updatedFeatures;
    });
  };

  const handleDeleteFeatures = (id) => {
    const deletedFeature = features.filter((parameter) => parameter.id !== id);
    setFeatures(deletedFeature);
  };

  const handleEditingFeatures = (id) => {
    const updatedFeatures = features.map((feature) => {
      if (feature.id === id) {
        return { ...feature, isEditing: true };
      }
      return feature;
    });
    setFeatures(updatedFeatures);
  };

  const handleChangeDescription = (event) => {
    setDescription({
      ...description,
      desc: event.target.value,
    });
  };

  const handleEditingDescription = () => {
    setDescription((prevDesc) => ({
      ...prevDesc,
      isEditing: true,
    }));
  };

  const searchValueCategory = (categoryData) => {
    const filteredArray = categoryOptions.find(
      (category) => category.value === categoryData
    );
    return filteredArray || null;
  };

  const searchValueBrand = (brandData) => {
    const concatArray = [
      ...brandsKeyboards,
      ...brandsAccessory,
      ...brandsCover,
      ...brandsWebCam,
      ...brandsMouse,
      ...brandsMicrophone,
    ];

    const concatArrayUnique = concatArray.reduce((uniqueArray, obj) => {
      if (!uniqueArray.some((o) => o.value === obj.value)) {
        uniqueArray.push(obj);
      }
      return uniqueArray;
    }, []);
    const filteredArray = concatArrayUnique.find(
      (brand) => brand.value === brandData
    );
    return filteredArray || null;
  };

  const searchValueAvailable = (availableData) => {
    const filteredArray = availableOptions.find(
      (available) => available.value === availableData
    );
    return filteredArray || null;
  };

  const searchValueTickets = (ticketsData) => {
    const filteredArray = tickets.find(
      (ticket) => ticket.value === ticketsData[0]
    );
    return filteredArray || null;
  };

  const searchValuePlateKeyboards = (plateData) => {
    const filteredArray = platesKeyboards.find(
      (plate) => plate.value === plateData
    );

    return filteredArray || null;
  };
  useEffect(() => {
    if (status === 'success' && data !== null && data.admin !== 1) {
      return <Navigate to='/'></Navigate>;
    }
  }, [status, data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_left}>
        <div className={styles.upload_photos_wrapper}>
          <p className={styles.upload_photos_title}>
            Загрузка фотографий товара
          </p>
          <div className={styles.upload_photos}>
            {newItem.image_links?.map(
              (imageURL, index) =>
                imageURL && (
                  <a
                    href={imageURL !== '' ? imageURL : null}
                    target='_blank'
                    rel='noreferrer'
                    key={index}
                  >
                    <img
                      src={imageURL}
                      alt={`Загруженное изображение ${index}`}
                      className={styles.uploaded_photo}
                    />
                  </a>
                )
            )}
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
            value={newItem.old_price}
            onChange={handleChange}
            placeholder='Введите старую цену товара'
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

          <CreatableSelect
            className='basic-single'
            classNamePrefix='select'
            defaultValue={
              dataChange
                ? searchValueCategory(dataChange.category)
                : categoryOptions[0]
            }
            isClearable={isClearable}
            onChange={(event) =>
              handleCreatableSelectChange('category', event.value)
            }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange
                    ? searchValuePlateKeyboards(platesParsedParametersDop)
                    : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
                defaultValue={
                  dataChange ? searchValueBrand(dataChange?.brand) : null
                }
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
            defaultValue={
              dataChange
                ? searchValueAvailable(dataChange?.availability)
                : availableOptions[0]
            }
            isClearable={isClearable}
            onChange={(event) =>
              handleCreatableSelectChange('availability', event.value)
            }
            isSearchable={isSearchable}
            name='availability'
            options={availableOptions}
          />
          <Select
            className='basic-single'
            classNamePrefix='select'
            defaultValue={
              dataChange?.type.count === 0
                ? searchValueTickets(
                    JSON.parse(dataChange?.type ? dataChange.type : null)
                  )
                : tickets[0]
            }
            isClearable={isClearable}
            onChange={(event) =>
              handleCreatableSelectChange('availability', event.value)
            }
            isSearchable={isSearchable}
            name='availability'
            options={tickets}
          />
        </div>
        <div className={styles.create_wrapper}>
          <button className={styles.create}>
            {dataChange ? 'Редактировать' : 'Создать'} товар
          </button>
        </div>
      </div>
      <div className={styles.wrapper_right}>
        <div className={styles.description}>
          <div className={styles.description_title}>Полное описание товара</div>
          <div className={styles.description_wrapper}>
            <DescriptionItem
              props={description}
              propsValue={newItem.desc}
              onChange={handleChangeDescription}
              onEditing={handleEditingDescription}
            />
            {description.isEditing ? (
              <button
                onClick={() => {
                  setDescription((prevDescription) => ({
                    ...prevDescription,
                    isEditing: !prevDescription.isEditing,
                  }));
                }}
              >
                <AiOutlineCheckCircle />
              </button>
            ) : null}
          </div>
        </div>
        <div className={styles.parameters}>
          <div className={styles.parameters_title}>Характеристики</div>
          <div className={styles.parameters_add_wrapper}>
            <button
              className={styles.parameters_add}
              onClick={handleAddParameter}
            >
              <BsPlusCircle />
            </button>
          </div>
          <div className={styles.parameters_wrapper}>
            {parameters.map((parameter) => (
              <div className={styles.parameters_item} key={parameter.id}>
                <ParameterItem
                  props={parameter}
                  onChange={handleChangeParameter}
                  onDelete={handleDeleteParameter}
                  onEditing={handleEditingParameter}
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
                    <AiOutlineCheckCircle />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.feature_title}>Особенности</div>
          <div className={styles.feature_add_wrapper}>
            <button className={styles.feature_add} onClick={handleAddFeature}>
              <BsPlusCircle />
            </button>
          </div>
          <div className={styles.feature_wrapper}>
            {features?.map((feature, index) => (
              <div className={styles.feature_item} key={feature.id}>
                <FeatureItem
                  props={feature}
                  onChange={handleChangeFeatures}
                  onDelete={handleDeleteFeatures}
                  onEditing={handleEditingFeatures}
                />
                {feature.isEditing ? (
                  <button
                    onClick={() => {
                      setFeatures((prevFeatures) => {
                        const updatedFeatures = prevFeatures.map(
                          (prevFeature) => {
                            if (prevFeature.id === feature.id) {
                              return {
                                ...prevFeature,
                                isEditing: !prevFeature.isEditing,
                              };
                            }
                            return prevFeature;
                          }
                        );
                        return updatedFeatures;
                      });
                    }}
                  >
                    <AiOutlineCheckCircle />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCreateChange;

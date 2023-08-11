import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { fetchNewItem } from '../../redux/slices/adminSlice'
import { selectUserData } from '../../redux/slices/authSlice'
import styles from './AdminCreate.module.sass'
import DescriptionItem from './DescriptionItem'
import {
  availableOptions,
  brandsAccessory,
  brandsCover,
  brandsKeyboards,
  brandsMicrophone,
  brandsMouse,
  brandsWebCam,
  categoryOptions,
  layoutKeyboards,
  tickets,
} from './optionsData'
import AdminSelect from './AdminSelect'
import ParameterBlock from './ParameterBlock'
import FeatureBlock from './FeatureBlock'

const AdminCreateChange = ({ propsItem }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  const dataChange = propsItem.props
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
      ]

  const parsedFeatures = dataChange?.feature
    ? JSON.parse(dataChange?.feature)
    : null || [
        {
          id: Math.random(),
          title: '',
          desc: '',
          isEditing: true,
        },
      ]

  const parsedParameters = dataChange?.parameters
    ? JSON.parse(dataChange?.parameters)
    : null || [
        {
          id: Math.random(),
          title: '',
          desc: '',
          isEditing: true,
        },
      ]

  const parsedImage = dataChange?.image_link
    ? JSON.parse(dataChange?.image_link)
    : null || []

  const dispatch = useDispatch()
  const { data, status } = useSelector(selectUserData)

  const initialState = {
    name: dataChange?.name || '',
    brand: dataChange?.brand || '',
    feature: parsedFeatures,
    description_small: dataChange?.description_small || '',
    description_full: dataChange?.description_full || '',
    old_price: Number(dataChange?.old_price) || '',
    price: Number(dataChange?.price) || '',
    availability: dataChange?.availability || availableOptions[0],
    colors: dataChange?.colors || [],
    colors_avail: dataChange?.colors_avail || [],
    parameters: parsedParameters,
    parameters_avail: dataChange?.parameters_avail || [],
    parameters_dop: parsedParametersDop,
    type: dataChange?.type || '',
    image_links: parsedImage,
    weight: dataChange?.weight || '',
    category: dataChange?.category || categoryOptions[0].value,
  }
  const [newItem, setNewItem] = useState(initialState)

  const uploadImage = async (file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('key', '835dbdbb109ca2b4323a35bd10d9d6bc')
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData
      )
      const imageURL = response.data.data.url
      setNewItem((prevNewItem) => ({
        ...prevNewItem,
        image_links: [...prevNewItem.image_links, imageURL],
      }))
    } catch (error) {
      console.log('Error uploading image:', error)
    }
  }

  // Реализовать удаление фотографии
  const handleDeleteImage = (id) => {}

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    uploadImage(file)
  }

  const sendForm = async (e) => {
    e.preventDefault()
    const response = await dispatch(
      fetchNewItem({
        ...newItem,
        info_category: [],
        colors: [],
        colors_avail: [],
        price: Number(newItem.price),
        old_price: Number(newItem.old_price),
        weight: Number(newItem.weight),
        parameters_avail: [],
        type: [newItem.type],
      })
    )
    if (!response.payload) {
      alert('Не удалось создать товар')
    } else {
      setNewItem(initialState)
    }
  }

  const changeItem = () => {}

  useEffect(() => {
    if (status === 'success' && data !== null && data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }, [status, data])
  console.log(newItem)

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
                    target="_blank"
                    rel="noreferrer"
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
                type="file"
                className={styles.upload_photo}
                placeholder=""
                onChange={handleFileChange}
              />
              <BsPlusCircle />
            </div>
          </div>
        </div>

        <AdminSelect
          newItem={newItem}
          setNewItem={setNewItem}
          parsedParametersDop={parsedParametersDop}
          dataChange={dataChange}
        />

        <div className={styles.create_wrapper}>
          <button
            onClick={dataChange ? sendForm : changeItem}
            className={styles.create}
          >
            {dataChange ? 'Редактировать' : 'Создать'} товар
          </button>
        </div>
      </div>
      <div className={styles.wrapper_right}>
        <DescriptionItem
          propsValue={newItem.description_full}
          newItem={newItem}
          setNewItem={setNewItem}
          dataChange={dataChange}
        />

        <ParameterBlock parsedParameters={parsedParameters} />
        <FeatureBlock parsedFeatures={parsedFeatures} />
      </div>
    </div>
  )
}
export default AdminCreateChange

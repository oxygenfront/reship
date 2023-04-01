import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchChangeItem } from '../redux/slices/adminSlice'
import {
  fetchFullItem,
  selectFullItemData,
} from '../redux/slices/fullItemSlice'

const AdminChange = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { item, status } = useSelector(selectFullItemData)

  useEffect(() => {
    dispatch(fetchFullItem({ id }))
  }, [])
  console.log(item)
  const initialState = {
    name: '',
    description_small: '',
    description_full: '',
    old_price: '',
    price: '',
    availability: '',
    colors: '',
    colors_avail: '',
    parameters: '',
    parameters_avail: '',
    image_link: '',
    category: '',
    token: '',
  }

  const [changeItem, setChangeItem] = useState({})
  useEffect(() => {
    if (status === 'success') {
      setChangeItem({
        id: item.id,
        name: item.name,
        description_small: item.description_small,
        description_full: item.description_full,
        old_price: item.old_price,
        price: item.price,
        availability: item.availability,
        colors: item.colors,
        colors_avail: item.colors_avail,
        parameters: item.parameters,
        parameters_avail: item.parameters_avail,
        image_link: item.image_link,
        category: item.category,
        token: localStorage.getItem('token'),
      })
    }
  }, [status])

  function updateItem(e) {
    setChangeItem({
      ...changeItem,
      [e.target.name]: e.target.value,
    })
  }

  async function sendForm(e) {
    e.preventDefault()
    console.log(changeItem)
    const data = await dispatch(fetchChangeItem(changeItem))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось изменить товар')
    }
    setChangeItem(initialState)
    alert('Товар успешно изменен!')
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title">Изменение товара</h1>
        <div className="main-form main-form_order">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              name="name"
              value={changeItem.name}
              onChange={updateItem}
              type="text"
              placeholder="name"
            />
            <input
              className="main-form__form-input"
              name="description_small"
              placeholder="description_small"
              value={changeItem.description_small}
              onChange={updateItem}
              type="text"
            />
            <input
              className="main-form__form-input"
              name="description_full"
              value={changeItem.description_full}
              onChange={updateItem}
              type="text"
              placeholder="description_full"
            />
            <input
              className="main-form__form-input"
              name="old_price"
              value={changeItem.old_price}
              onChange={updateItem}
              type="text"
              placeholder="old_price"
            />
            <input
              className="main-form__form-input"
              name="price"
              value={changeItem.price}
              onChange={updateItem}
              type="text"
              placeholder="price"
            />
            <input
              className="main-form__form-input"
              name="availability"
              value={changeItem.availability}
              onChange={updateItem}
              type="text"
              placeholder="availability"
            />
            <input
              className="main-form__form-input"
              name="colors"
              value={changeItem.colors}
              onChange={updateItem}
              type="text"
              placeholder="colors"
            />
            <input
              className="main-form__form-input"
              name="colors_avail"
              value={changeItem.colors_avail}
              onChange={updateItem}
              type="text"
              placeholder="colors_avail"
            />
            <input
              className="main-form__form-input"
              name="parameters"
              value={changeItem.parameters}
              onChange={updateItem}
              type="text"
              placeholder="parameters"
            />
            <input
              className="main-form__form-input"
              name="parameters_avail"
              value={changeItem.parameters_avail}
              onChange={updateItem}
              type="text"
              placeholder="parameters_avail"
            />
            <input
              className="main-form__form-input"
              name="image_link"
              value={changeItem.image_link}
              onChange={updateItem}
              type="text"
              placeholder="image_link"
            />
            <input
              className="main-form__form-input"
              name="category"
              value={changeItem.category}
              onChange={updateItem}
              type="text"
              placeholder="category"
            />

            <input
              className="main-form__form-btn"
              type="submit"
              value="Изменить товар"
              onClick={sendForm}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminChange

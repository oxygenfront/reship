import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchNewItem } from '../redux/slices/adminSlice'

const AdminCreate = () => {
  const dispatch = useDispatch()
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
  const [newItem, setNewItem] = useState({
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
    token: localStorage.getItem('token'),
  })

  function updateItem(e) {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    })
  }

  async function sendForm(e) {
    e.preventDefault()
    console.log(newItem)
    const data = await dispatch(fetchNewItem(newItem))
    console.log(data)
    if (!data.payload) {
      return alert('Не удалось создать товар')
    }
    setNewItem(initialState)
  }
  return (
    <section className="auth">
      <div className="container auth__container">
        <h1 className="auth__title">Создание товара</h1>
        <div className="main-form main-form_order">
          <form className="main-form__form" action="">
            <input
              className="main-form__form-input"
              name="name"
              value={newItem.name}
              onChange={updateItem}
              type="text"
              placeholder="name"
            />
            <input
              className="main-form__form-input"
              name="description_small"
              placeholder="description_small"
              value={newItem.description_small}
              onChange={updateItem}
              type="text"
            />
            <input
              className="main-form__form-input"
              name="description_full"
              value={newItem.description_full}
              onChange={updateItem}
              type="text"
              placeholder="description_full"
            />
            <input
              className="main-form__form-input"
              name="old_price"
              value={newItem.old_price}
              onChange={updateItem}
              type="text"
              placeholder="old_price"
            />
            <input
              className="main-form__form-input"
              name="price"
              value={newItem.price}
              onChange={updateItem}
              type="text"
              placeholder="price"
            />
            <input
              className="main-form__form-input"
              name="availability"
              value={newItem.availability}
              onChange={updateItem}
              type="text"
              placeholder="availability"
            />
            <input
              className="main-form__form-input"
              name="colors"
              value={newItem.colors}
              onChange={updateItem}
              type="text"
              placeholder="colors"
            />
            <input
              className="main-form__form-input"
              name="colors_avail"
              value={newItem.colors_avail}
              onChange={updateItem}
              type="text"
              placeholder="colors_avail"
            />
            <input
              className="main-form__form-input"
              name="parameters"
              value={newItem.parameters}
              onChange={updateItem}
              type="text"
              placeholder="parameters"
            />
            <input
              className="main-form__form-input"
              name="parameters_avail"
              value={newItem.parameters_avail}
              onChange={updateItem}
              type="text"
              placeholder="parameters_avail"
            />
            <input
              className="main-form__form-input"
              name="image_link"
              value={newItem.image_link}
              onChange={updateItem}
              type="text"
              placeholder="image_link"
            />
            <input
              className="main-form__form-input"
              name="category"
              value={newItem.category}
              onChange={updateItem}
              type="text"
              placeholder="category"
            />

            <input
              className="main-form__form-btn"
              type="submit"
              value="Создать новый товар"
              onClick={sendForm}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminCreate

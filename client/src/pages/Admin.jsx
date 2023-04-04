import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { AdminItem } from '../components'
import { fetchItems, selectItemsData } from '../redux/slices/itemsSlice'
import { selectUserData } from '../redux/slices/authSlice'

const Admin = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(selectItemsData)
  const { data, userStatus = status } = useSelector(selectUserData)

  useEffect(() => {
    dispatch(fetchItems({}))
  }, [])
  const set = new Set()

  if (status === 'success') {
    items.map((item) => set.add(item.category))
  }
  console.log(data, userStatus)
  if (userStatus === 'success' && data !== null) {
    if (data.admin !== 1) {
      return <Navigate to="/"></Navigate>
    }
  }
  const categories = [...set]

  return (
    <div className="admin-wrapper">
      <Link to="/admin/create" className="admin-wrapper-createbtn">
        Создать новый товар
      </Link>
      {categories.map((categorie, index) => (
        <>
          <div className="catalog__suptitle" key={categorie} id={categorie}>
            <span>{categorie}</span>
          </div>
          <div key={index} className="admin-items-block">
            {status === 'loading'
              ? null
              : items
                  .filter((item) => {
                    if (item.category === categorie) {
                      return true
                    } else {
                      return false
                    }
                  })
                  .map((item) => (
                    <AdminItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image_link}
                    ></AdminItem>
                  ))}
          </div>
        </>
      ))}
    </div>
  )
}
export default Admin
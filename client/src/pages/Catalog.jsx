import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Skeleton } from '../components'
import {
  selectFilter,
  setChoosenCategorie,
  setSearchValue,
} from '../redux/slices/fiterSlice'
import { fetchFullItem } from '../redux/slices/fullItemSlice'
import { selectItemsData } from '../redux/slices/itemsSlice'

const Catalog = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(selectItemsData)

  const { choosenCategorie, searchValue } = useSelector(selectFilter)

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])
  const set = new Set()

  if (status === 'success') {
    items.map((item) => set.add(item.category))
  }
  const categories = [...set]

  return (
    <section className="catalog">
      <div className="container catalog__container">
        <div className="catalog__supheader">
          <h1 className="catalog__title">Добро пожаловать в Каталог!</h1>
          <div className="search-section catalog-section">
            <div className=" catalog-section__container">
              <div className="search-section__search-block catalog-section-search__search-block">
                <input
                  value={searchValue}
                  onChange={(e) => dispatch(setSearchValue(e.target.value))}
                  type="text"
                  placeholder="Поиск товара"
                  className="search-section__search-item"
                />
                <button className="search-section__search-block_glass">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="main-catalog__buttons buttons__10">
            <button
              onClick={() => onChangeCategory('')}
              className="main-catalog__buttons-item buttons__10-item catalog-section__buttons-item"
              id="catalog"
            >
              <span>Каталог</span>
            </button>

            <button
              onClick={() => onChangeCategory('новинки')}
              className="main-catalog__buttons-item buttons__10-item catalog-section__buttons-item"
              id="news"
            >
              <span>Новинки</span>
            </button>

            <button
              onClick={() => onChangeCategory('акции')}
              className="main-catalog__buttons-item buttons__10-item
							catalog-section__buttons-item"
              id="action"
            >
              <span>Акции</span>
            </button>

            <button
              onClick={() => onChangeCategory('лидеры продаж')}
              className="main-catalog__buttons-item buttons__10-item
							catalog-section__buttons-item"
              id="leaders"
            >
              <span>Лидеры продаж</span>
            </button>
          </div>
        </div>

        <div
          className={
            choosenCategorie === 'акции'
              ? 'catalog__items-block'
              : 'catalog__block'
          }
        >
          {choosenCategorie === 'акции'
            ? items
                .filter((item) => {
                  if (item.old_price !== item.price) {
                    return true
                  } else {
                    return false
                  }
                })
                .map((item) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    old_price={item.old_price}
                    price={item.price}
                  ></Card>
                ))
            : categories.map((categorie, index) => (
                <>
                  <div className="catalog__suptitle" id={categorie}>
                    <span>{categorie}</span>
                  </div>
                  <div key={index} className="catalog__items-block">
                    {status === 'loading'
                      ? [...new Array(3)].map((_, index) => (
                          <Skeleton key={index}></Skeleton>
                        ))
                      : items
                          .filter((item) => {
                            if (item.category === categorie) {
                              return true
                            } else {
                              return false
                            }
                          })
                          .filter((item) => {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                            ) {
                              return true
                            } else {
                              return false
                            }
                          })

                          .map((item) => (
                            <Card
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              old_price={item.old_price}
                              price={item.price}
                              image={item.image_link}
                            ></Card>
                          ))}
                  </div>
                </>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Catalog

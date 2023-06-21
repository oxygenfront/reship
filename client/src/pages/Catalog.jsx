import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Skeleton } from '../components'
import {
  selectFilter,
  setChoosenCategorie,
  setChoosenPrice,
  setSearchValue,
} from '../redux/slices/fiterSlice'
import { fetchFullItem } from '../redux/slices/fullItemSlice'
import { fetchItems, selectItemsData } from '../redux/slices/itemsSlice'
import { RangeSlider, InputGroup, InputNumber } from 'rsuite'
import { Navigate } from 'react-router-dom'
import { Menu as DropDown } from '@headlessui/react'

const Catalog = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showFilters, setShowFilters] = useState(false)
  const [rangeValue, setRangeValue] = useState([2000, 12000])
  const dispatch = useDispatch()
  const { items, status } = useSelector(selectItemsData)
  const theme = useSelector((state) => state.theme)
  const { choosenCategorie, searchValue, choosenPrice } =
    useSelector(selectFilter)
  const [choosenView, setChoosenView] = useState('grid')
  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort))
  }, [])
  const set = new Set()
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowWidth > 767) {
      setShowFilters(false)
    }
  }, [windowWidth])

  if (status === 'success') {
    items.map((item) => set.add(item.category))
  }
  const categories = [...set]

  if (searchValue === '' && choosenCategorie === '') {
    return <Navigate to="/"></Navigate>
  }
  console.log(choosenPrice)

  // const fnShowFilters = () => {
  //   if (windowWidth > 767) {
  //     setShowFilters(false)
  //   }
  // }

  return (
    <section className="catalog">
      <div className="catalog__container container">
        <div className="catalog__title">
          {searchValue !== ''
            ? searchValue[0].toUpperCase() + searchValue.slice(1)
            : choosenCategorie[0].toUpperCase() + choosenCategorie.slice(1)}
        </div>
        <div className="catalog__wrapper">
          {showFilters || windowWidth > 767 ? (
            <div className="catalog__sort">
              <div className="catalog__sort-block">
                {showFilters ? <hr className="hr" /> : null}
                <div className="catalog__sort_title">Категория</div>
                <label
                  htmlFor="category1"
                  className="catalog__sort_checkbox-name"
                >
                  Беспроводные
                  <input
                    id="category1"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
                <label
                  htmlFor="category2"
                  className="catalog__sort_checkbox-name"
                >
                  Проводные
                  <input
                    id="category2"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
                <label
                  htmlFor="category3"
                  className="catalog__sort_checkbox-name"
                >
                  С подсветкой
                  <input
                    id="category3"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
              </div>
              <div className="catalog__sort-block">
                <div className="catalog__sort_title">Бренды</div>
                <label
                  htmlFor="category4"
                  className="catalog__sort_checkbox-name"
                >
                  Razer
                  <input
                    id="category4"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
                <label
                  htmlFor="category5"
                  className="catalog__sort_checkbox-name"
                >
                  Logitech
                  <input
                    id="category5"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
                <label
                  htmlFor="category6"
                  className="catalog__sort_checkbox-name"
                >
                  Varmilo
                  <input
                    id="category6"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
              </div>
              <div className="catalog__sort-block">
                <div className="catalog__sort_title">Тип </div>
                <label
                  htmlFor="category7"
                  className="catalog__sort_checkbox-name"
                >
                  Оптическая
                  <input
                    id="category7"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
              </div>
              <div className="catalog__sort-block mb73">
                <div className="catalog__sort_title">Цена</div>
                <RangeSlider
                  progress
                  value={choosenPrice}
                  min={1000}
                  max={30000}
                  onChange={(value) => {
                    dispatch(setChoosenPrice(value))
                  }}
                />
                <InputGroup>
                  <InputNumber
                    max={30000}
                    value={choosenPrice[0]}
                    onChange={(nextValue) => {
                      const [start, end] = choosenPrice
                      dispatch(setChoosenPrice([Number(nextValue), end]))
                    }}
                  />
                  <InputNumber
                    max={30000}
                    value={choosenPrice[1]}
                    onChange={(nextValue) => {
                      const [start, end] = choosenPrice
                      dispatch(setChoosenPrice([start, Number(nextValue)]))
                    }}
                  />
                </InputGroup>
              </div>
              <div className="catalog__sort-block">
                <label
                  htmlFor="category8"
                  className="catalog__sort_checkbox-name"
                >
                  В наличии
                  <input
                    id="category8"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
                <label
                  htmlFor="category9"
                  className="catalog__sort_checkbox-name"
                >
                  Со скидкой
                  <input
                    id="category9"
                    type="checkbox"
                    className="catalog__sort_checkbox"
                  />
                </label>
              </div>
              <div className="catalog__sort-block_buttons">
                <button className="catalog__sort-block_buttons-item blue">
                  Применить
                </button>
                <button className="catalog__sort-block_buttons-item white">
                  Сбросить
                </button>
              </div>
            </div>
          ) : null}

          <div className="catalog__main">
            <div className="catalog__main_filters">
              {windowWidth > 767 ? (
                <div className="catalog__main_filters_popular">
                  <span>С подсветкой</span>
                  <span>Razer</span>
                  <span>Проводные</span>
                  <span>Logitech</span>
                  <span>Беспроводные</span>
                </div>
              ) : (
                <div className="catalog__main_filters_popular">
                  <span>С подсветкой</span>
                  <span>Razer</span>
                  <span>Проводные</span>
                </div>
              )}

              <div className="catalog__main_filters-main">
                {windowWidth <= 767 || showFilters ? (
                  <div>
                    <span
                      onClick={() => setShowFilters(!showFilters)}
                      style={
                        showFilters && windowWidth <= 575
                          ? {
                              marginLeft: '15px',
                            }
                          : showFilters
                          ? {
                              marginLeft: '31px',
                            }
                          : null
                      }
                    >
                      Фильтр
                    </span>
                  </div>
                ) : null}
                <div>
                  <span>Сортировка</span>
                  <DropDown
                    as="div"
                    className="catalog__main_filters-main_menu"
                  >
                    <div className="catalog__main_filters-main_menu_button">
                      <DropDown.Button>
                        <div>
                          <img
                            src={
                              theme === 'white'
                                ? '../assets/img/arrows-sort.png'
                                : '../assets/img/arrows-black.png'
                            }
                            alt=""
                          />
                        </div>
                      </DropDown.Button>
                    </div>

                    <DropDown.Items className="catalog__main_filters-main_menu_items">
                      <div className="catalog__main_filters-main_menu_items_wrapper">
                        <DropDown.Item className="catalog__main_filters-main_menu_item">
                          <div>По популярности</div>
                        </DropDown.Item>
                        <DropDown.Item className="catalog__main_filters-main_menu_item">
                          <div>Подоророже</div>
                        </DropDown.Item>
                        <DropDown.Item className="catalog__main_filters-main_menu_item">
                          <div>Подешевле</div>
                        </DropDown.Item>
                      </div>
                    </DropDown.Items>
                  </DropDown>
                </div>

                {windowWidth > 991 ? (
                  <button
                    onClick={() => setChoosenView('flex')}
                    className="catalog__main_filters-main_row"
                  >
                    <img
                      src={
                        choosenView === 'flex'
                          ? '../assets/img/filter-row-active.png'
                          : '../assets/img/filter-row-main.png'
                      }
                      alt=""
                    />
                  </button>
                ) : null}
                {windowWidth > 991 ? (
                  <button
                    onClick={() => setChoosenView('grid')}
                    className="catalog__main_filters-main_grid"
                  >
                    <img
                      src={
                        choosenView === 'grid'
                          ? '../assets/img/filter-grid-active.png'
                          : '../assets/img/filter-grid-main.png'
                      }
                      alt=""
                    />
                  </button>
                ) : null}
              </div>
            </div>

            {!showFilters || windowWidth > 767 ? (
              <div
                className={
                  choosenView === 'grid'
                    ? 'catalog__main_wrapper_grid'
                    : 'catalog__main_wrapper_flex'
                }
              >
                {status === 'success' && items.length > 0 ? (
                  items.map((item) => (
                    <Card
                      image={item.image_link}
                      description={item.description_small}
                      view={choosenView}
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      id={item.id}
                    ></Card>
                  ))
                ) : (
                  <div
                    style={{
                      backgroundImage: `url('../assets/img/no-item.png')`,
                      backgroundSize: 'cover',
                    }}
                    className="catalog__empty"
                  >
                    Не найдено
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Catalog

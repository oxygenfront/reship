import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Skeleton } from '../components'
import {
  selectFilter,
  setChoosenBrand,
  setChoosenCategorie,
  setChoosenPrice,
  setSearchValue,
} from '../redux/slices/fiterSlice'
import { fetchFullItem } from '../redux/slices/fullItemSlice'
import { fetchItems, selectItemsData } from '../redux/slices/itemsSlice'
import { RangeSlider, InputGroup, InputNumber } from 'rsuite'
import { Navigate } from 'react-router-dom'
import { Menu as DropDown } from '@headlessui/react'
import { debounce } from 'lodash'

const Catalog = () => {
  const dispatch = useDispatch()
  const set = new Set()
  const brandSet = new Set()

  const { items, status } = useSelector(selectItemsData)
  const theme = useSelector((state) => state.theme)
  const { choosenCategorie, searchValue, choosenPrice, choosenType } =
    useSelector(selectFilter)
  console.log(choosenPrice)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showFilters, setShowFilters] = useState(false)
  const [choosenView, setChoosenView] = useState('grid')
  const [price, setPrice] = useState([2000, 12000])

  const [localBrands, setLocalBrands] = useState('')
  const [localCategories, setLocalCategories] = useState('')

  console.log(localBrands)
  console.log(localCategories)
  const confirmFilters = () => {
    dispatch(setChoosenBrand(localBrands))
    dispatch(setChoosenCategorie(localCategories))
    dispatch(setChoosenPrice(price))
  }
  const cancelFilters = () => {
    setLocalBrands('')
    setLocalCategories('')
    setPrice([2000, 12000])
    dispatch(setLocalBrands(''))
    dispatch(setLocalCategories(''))
    dispatch(setPrice([2000, 12000]))
  }

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
    items.map((item) => brandSet.add(item.brand))
  }
  const categories = [...set]
  const brands = [...brandSet]
  if (searchValue === '' && choosenCategorie === '' && choosenType === '') {
    return <Navigate to="/"></Navigate>
  }

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
                {categories.map((category) => (
                  <label
                    key={category}
                    htmlFor={category}
                    className="catalog__sort_checkbox-name"
                  >
                    {category}
                    <input
                      onClick={(e) => {
                        e.target.checked
                          ? setLocalCategories(
                              (prev) => (prev += category + ' ')
                            )
                          : setLocalCategories((prev) =>
                              prev.replace(category + ' ', '')
                            )
                      }}
                      checked={localCategories.includes(category)}
                      readOnly
                      id={category}
                      type="checkbox"
                      className="catalog__sort_checkbox"
                    />
                  </label>
                ))}
              </div>
              <div className="catalog__sort-block">
                <div className="catalog__sort_title">Бренды</div>
                {brands.map((brand) => (
                  <label
                    key={brand}
                    htmlFor={brand}
                    className="catalog__sort_checkbox-name"
                  >
                    {brand}
                    <input
                      onClick={(e) => {
                        e.target.checked
                          ? setLocalBrands((prev) => (prev += brand + ' '))
                          : setLocalBrands((prev) =>
                              prev.replace(brand + ' ', '')
                            )
                      }}
                      checked={localBrands.includes(brand)}
                      readOnly
                      id={brand}
                      type="checkbox"
                      className="catalog__sort_checkbox"
                    />
                  </label>
                ))}
              </div>
              <div className="catalog__sort-block">
                <div className="catalog__sort_title">Тип </div>
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
              <div className="catalog__sort-block mb73">
                <div className="catalog__sort_title">Цена</div>
                <RangeSlider
                  progress
                  value={price}
                  min={1000}
                  max={30000}
                  onChange={(value) => {
                    setPrice(value)
                  }}
                />
                <InputGroup>
                  <InputNumber
                    max={30000}
                    value={price[0]}
                    onChange={(nextValue) => {
                      const [start, end] = choosenPrice
                      dispatch(setPrice([Number(nextValue), end]))
                    }}
                  />
                  <InputNumber
                    max={30000}
                    value={price[1]}
                    onChange={(nextValue) => {
                      const [start, end] = choosenPrice

                      setPrice([start, Number(nextValue)])
                    }}
                  />
                </InputGroup>
              </div>
              <div className="catalog__sort-block"></div>
              <div className="catalog__sort-block_buttons">
                <button
                  onClick={confirmFilters}
                  className="catalog__sort-block_buttons-item blue"
                >
                  Применить
                </button>
                <button
                  onClick={cancelFilters}
                  className="catalog__sort-block_buttons-item white"
                >
                  Сбросить
                </button>
              </div>
            </div>
          ) : null}

          <div className="catalog__main">
            <div className="catalog__main_filters">
              {windowWidth > 767 ? (
                <div className="catalog__main_filters_popular">
                  {localBrands.split(' ')[0] !== ''
                    ? localBrands
                        .split(' ')
                        .slice(0, -1)
                        .map((brand) => <span key={brand}>{brand}</span>)
                    : null}
                  {localCategories.split(' ')[0] !== ''
                    ? localCategories
                        .split(' ')
                        .slice(0, -1)
                        .map((category) => (
                          <span key={category}>{category}</span>
                        ))
                    : null}
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
                {status !== 'success' ? (
                  [...new Array(6)].map((item, index) => (
                    <Skeleton key={index}></Skeleton>
                  ))
                ) : status === 'success' && items.length > 0 ? (
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
                      backgroundImage:
                        theme === 'light'
                          ? `url('../assets/img/no-item.png')`
                          : `url('../assets/img/no-item black theme.png')`,
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

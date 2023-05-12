import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Skeleton } from '../components';
import {
  selectFilter,
  setChoosenCategorie,
  setSearchValue,
} from '../redux/slices/fiterSlice';
import { fetchFullItem } from '../redux/slices/fullItemSlice';
import { selectItemsData } from '../redux/slices/itemsSlice';
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectItemsData);

  const { choosenCategorie, searchValue } = useSelector(selectFilter);

  const onChangeCategory = useCallback((sort) => {
    dispatch(setChoosenCategorie(sort));
  }, []);
  const set = new Set();

  if (status === 'success') {
    items.map((item) => set.add(item.category));
  }
  const categories = [...set];

  const [rangeValue, setRangeValue] = useState([2000, 12000]);

  return (
    <section className='catalog'>
      <div className='catalog__container container'>
        <div className='catalog__title'>Мышки</div>
        <div className='catalog__wrapper'>
          <div className='catalog__sort'>
            <div className='catalog__sort-block'>
              <div className='catalog__sort_title'>Категория</div>
              <label
                htmlFor='category1'
                className='catalog__sort_checkbox-name'
              >
                Беспроводные
                <input
                  id='category1'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
              <label
                htmlFor='category2'
                className='catalog__sort_checkbox-name'
              >
                Проводные
                <input
                  id='category2'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
              <label
                htmlFor='category3'
                className='catalog__sort_checkbox-name'
              >
                С подсветкой
                <input
                  id='category3'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
            </div>
            <div className='catalog__sort-block'>
              <div className='catalog__sort_title'>Бренды</div>
              <label
                htmlFor='category4'
                className='catalog__sort_checkbox-name'
              >
                Razer
                <input
                  id='category4'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
              <label
                htmlFor='category5'
                className='catalog__sort_checkbox-name'
              >
                Logitech
                <input
                  id='category5'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
              <label
                htmlFor='category6'
                className='catalog__sort_checkbox-name'
              >
                Varmilo
                <input
                  id='category6'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
            </div>
            <div className='catalog__sort-block'>
              <div className='catalog__sort_title'>Категория</div>
              <label
                htmlFor='category7'
                className='catalog__sort_checkbox-name'
              >
                Оптическая
                <input
                  id='category7'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
            </div>
            <div className='catalog__sort-block mb73'>
              <div className='catalog__sort_title'>Цена</div>
              <RangeSlider
                progress
                value={rangeValue}
                min={1000}
                max={30000}
                onChange={(value) => {
                  setRangeValue(value);
                }}
              />
              <InputGroup>
                <InputNumber
                  max={30000}
                  value={rangeValue[0]}
                  onChange={(nextValue) => {
                    const [start, end] = rangeValue;
                    setRangeValue([Number(nextValue), end]);
                  }}
                />
                <InputNumber
                  max={30000}
                  value={rangeValue[1]}
                  onChange={(nextValue) => {
                    const [start, end] = rangeValue;
                    setRangeValue([start, Number(nextValue)]);
                  }}
                />
              </InputGroup>
            </div>
            <div className='catalog__sort-block'>
              <label
                htmlFor='category8'
                className='catalog__sort_checkbox-name'
              >
                В наличии
                <input
                  id='category8'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
              <label
                htmlFor='category9'
                className='catalog__sort_checkbox-name'
              >
                Сос скидкой
                <input
                  id='category9'
                  type='checkbox'
                  className='catalog__sort_checkbox'
                />
              </label>
            </div>
            <div className='catalog__sort-block_buttons'>
              <button className='catalog__sort-block_buttons-item blue'>
                Применить
              </button>
              <button className='catalog__sort-block_buttons-item white'>
                Сбросить
              </button>
            </div>
          </div>

          <div className='catalog__main'>
            <div className='catalog__main_filters'>
              <div className='catalog__main_filters_popular'>
                <span>С подсветкой</span>
                <span>Razer</span>
                <span>Проводные</span>
                <div>Logitech</div>
                <div>Беспроводные</div>
              </div>

              <div className='catalog__main_filters-main'>
                <span>Сортировка</span>
                <button className='catalog__main_filters-main_popup'>
                  <img src='../assets/img/arrows-sort.png' alt='' />
                </button>
                <button className='catalog__main_filters-main_row'>
                  <img src='../assets/img/filter-row-main.png' alt='' />
                </button>
                <button className='catalog__main_filters-main_grid'>
                  <img src='../assets/img/filter-grid-main.png' alt='' />
                </button>
              </div>
            </div>

            <div className='catalog__main_wrapper'>
              <div className='catalog__main_item'>
                <div className='catalog__main_item_left'>
                  <img src='../assets/img/nigger.jpg' alt='' />
                </div>
                <div className='catalog__main_item_mid'>
                  <div className='catalog__main_item_mid-title'>
                    Афроамериканец Уфува
                  </div>
                  <div className='catalog__main_item_mid-subtitle'>
                    Черные работают лучше. <br /> Хороший экземпляр. Хлопок
                    собирает быстро, если достать плеть, ускоряется вдвое.
                  </div>
                </div>
                <div className='catalog__main_item_right'>
                  <div className='catalog__main_item_right-price'>
                    от 11 111 руб
                  </div>
                  <div className='catalog__main_item_right-rating'>
                    <img src='../assets/img/star-review.png' alt='' />
                    <span>4.5</span>
                    <span>5 отзывов</span>
                  </div>

                  <button className='catalog__main_item_right-add'>
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;

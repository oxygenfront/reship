import React, { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import styles from './AdminCreate.module.sass'
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
} from './optionsData'

const AdminSelect = ({
  newItem,
  setNewItem,
  dataChange,
  parsedParametersDop,
}) => {
  const [height, setHeight] = useState(38)
  const platesParsedParametersDop = parsedParametersDop[0]?.plates?.map(
    (obj) => {
      return obj
    }
  )

  const switchesParsedParametersDop = parsedParametersDop[1]?.switches?.map(
    (obj) => {
      return obj
    }
  )

  const layoutsParsedParametersDop = parsedParametersDop[2]?.layouts?.map(
    (obj) => {
      return obj
    }
  )

  const handleCreatableSelectChange = (name, value) => {
    setNewItem((prevNewItem) => ({
      ...prevNewItem,
      [name]: value,
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewItem((prevNewItem) => ({
      ...prevNewItem,
      [name]: value,
    }))
    setHeight(`${event.target.scrollHeight}px`)
  }

  const searchSwitchKeyboards = (switchData) => {
    const transformedArray = switchData?.map((obj) => {
      const [keys] = Object.keys(obj)
      const transformedObj = {
        value: obj,
        label: keys,
      }
      return transformedObj
    })
    return transformedArray
  }
  const searchValueCategory = (categoryData) => {
    return (
      categoryOptions.find((category) => category.value === categoryData) ||
      null
    )
  }

  const searchValueBrand = (brandData) => {
    const concatArray = [
      ...brandsKeyboards,
      ...brandsAccessory,
      ...brandsCover,
      ...brandsWebCam,
      ...brandsMouse,
      ...brandsMicrophone,
    ]

    const concatArrayUnique = concatArray.reduce((uniqueArray, obj) => {
      if (!uniqueArray.some((o) => o.value === obj.value)) {
        uniqueArray.push(obj)
      }
      return uniqueArray
    }, [])

    return concatArrayUnique.find((brand) => brand.value === brandData) || null
  }

  const searchValueAvailable = (availableData) => {
    return (
      availableOptions.find((available) => available.value === availableData) ||
      null
    )
  }

  const searchValueTickets = (ticketsData) => {
    return tickets.find((ticket) => ticket.value === ticketsData[0]) || null
  }

  const searchPlateKeyboards = (plateData) => {
    const transformedArray = plateData?.map((obj) => {
      const [keys] = Object.keys(obj)
      const transformedObj = {
        value: obj,
        label: keys,
      }
      return transformedObj
    })

    return transformedArray
  }

  const searchLayoutKeyboards = (layoutData) => {
    const arrayObjLayouts = []
    layoutData?.forEach((transformedObj) => {
      const foundLayout = layoutKeyboards.find((objPlate) => {
        return Object.entries(objPlate.value).every(
          ([key, value]) => transformedObj[key] === value
        )
      })
      if (foundLayout) {
        arrayObjLayouts.push(foundLayout)
      }
    })

    return arrayObjLayouts
  }

  return (
    <div className={styles.info_item}>
      <input
        type="text"
        name="name"
        value={newItem.name}
        onChange={handleChange}
        placeholder="Введите название товара"
        className={styles.info_item_input}
      />
      <input
        type="text"
        name="old_price"
        value={newItem.old_price}
        onChange={handleChange}
        placeholder="Введите старую цену товара"
        className={styles.info_item_input}
      />
      <input
        type="text"
        name="price"
        value={newItem.price}
        onChange={handleChange}
        placeholder="Введите цену товара"
        className={styles.info_item_input}
      />
      <input
        type="text"
        name="weight"
        value={newItem.weight}
        onChange={handleChange}
        placeholder="Введите вес товара"
        className={styles.info_item_input}
      />
      <textarea
        type="text"
        name="description_small"
        value={newItem.description_small}
        onChange={handleChange}
        style={{ height }}
        placeholder="Введите краткое описание товара"
        className={styles.info_item_input}
      />

      <CreatableSelect
        className="basic-single"
        classNamePrefix="select"
        defaultValue={
          dataChange
            ? searchValueCategory(dataChange.category)
            : categoryOptions[0]
        }
        isClearable={true}
        onChange={(event) =>
          handleCreatableSelectChange('category', event.value)
        }
        isSearchable={true}
        name="category"
        options={categoryOptions}
      />
      {newItem.category === 'Мышки' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд мышки или введите бренд которого нет в списке"
            isClearable={true}
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsMouse}
          />
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите цвет мышки или введите цвет которого нет в списке"
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('colors', event.value)
            }
            isSearchable={true}
            name="colors"
            options={colorsMouse}
          />
        </>
      ) : newItem.category === 'Клавиатуры' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд клавиатуры или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsKeyboards}
          />
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите цвет клавиатуры или введите цвет которого нет в списке"
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('color', event.value)
            }
            isSearchable={true}
            name="color"
            options={colorsMouse}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            isMulti
            placeholder="Выберите раскладку клавиатуры или введите раскладку которого нет в списке"
            defaultValue={
              dataChange
                ? searchLayoutKeyboards(layoutsParsedParametersDop)
                : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('layout', event.value)
            }
            isSearchable={true}
            name="layout"
            options={layoutKeyboards}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите свитчи клавиатуры или введите свитчи которого нет в списке"
            isClearable={true}
            isMulti
            defaultValue={
              dataChange
                ? searchSwitchKeyboards(switchesParsedParametersDop)
                : null
            }
            onChange={(event) =>
              handleCreatableSelectChange('switches', event.value)
            }
            isSearchable={true}
            name="switches"
            options={switchesKeyboard}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            isMulti
            placeholder="Выберите материал платы клавиатуры или введите материал платы которого нет в списке"
            isClearable={true}
            defaultValue={
              dataChange
                ? searchPlateKeyboards(platesParsedParametersDop)
                : null
            }
            onChange={(event) =>
              handleCreatableSelectChange('plate', event.value)
            }
            isSearchable={true}
            name="plate"
            options={platesKeyboards}
          />
        </>
      ) : newItem.category === 'Наушники' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд наушников или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsHeadphones}
          />
        </>
      ) : newItem.category === 'Микрофоны' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд микрофона или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsMicrophone}
          />
        </>
      ) : newItem.category === 'Аксессуары' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд аксессуара или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsAccessory}
          />
        </>
      ) : newItem.category === 'Кейкапы' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд кейкапов или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsKeycap}
          />
        </>
      ) : newItem.category === 'Коврики' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд коврика или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsCover}
          />
        </>
      ) : newItem.category === 'Веб-камеры' ? (
        <>
          <CreatableSelect
            className="basic-single"
            classNamePrefix="select"
            placeholder="Выберите бренд веб-камеры или введите бренд которого нет в списке"
            defaultValue={
              dataChange ? searchValueBrand(dataChange?.brand) : null
            }
            isClearable={true}
            onChange={(event) =>
              handleCreatableSelectChange('brand', event.value)
            }
            isSearchable={true}
            name="brand"
            options={brandsWebCam}
          />
        </>
      ) : null}
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={
          dataChange
            ? searchValueAvailable(dataChange?.availability)
            : availableOptions[0]
        }
        isClearable={true}
        onChange={(event) =>
          handleCreatableSelectChange('availability', event.value)
        }
        isSearchable={true}
        name="availability"
        options={availableOptions}
      />
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={
          dataChange?.type.count === 0
            ? searchValueTickets(
                JSON.parse(dataChange?.type ? dataChange.type : null)
              )
            : tickets[0]
        }
        isClearable={true}
        onChange={(event) => handleCreatableSelectChange('type', event.value)}
        isSearchable={true}
        name="type"
        options={tickets}
      />
    </div>
  )
}

export default AdminSelect

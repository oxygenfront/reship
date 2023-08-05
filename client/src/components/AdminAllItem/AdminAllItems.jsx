import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, selectItemsData } from '../../redux/slices/itemsSlice';
import { selectFilter } from '../../redux/slices/fiterSlice';
import AdminAllItem from './AdminAllItem';

function AdminAllItems() {
  const dispatch = useDispatch();
  const { items } = useSelector(selectItemsData);
  const filterData = useSelector(selectFilter);

  const {
    choosenCategorie,
    searchValue,
    choosenPrice,
    catalogSort,
    choosenBrand,
    choosenType,
  } = filterData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchItems({
            choosenCategorie: '',
            searchValue: '',
            choosenPrice,
            catalogSort: '',
            choosenBrand: '',
            choosenType: '',
          })
        );
      } catch (error) {
        // Обработка ошибки
      }
    };

    fetchData();
  }, [
    choosenType,
    choosenBrand,
    choosenCategorie,
    choosenPrice,
    searchValue,
    catalogSort,
  ]);
  return (
    <>
      {items.map((item) => (
        <AdminAllItem props={item}/>
      ))}
    </>
  );
}

export default AdminAllItems;

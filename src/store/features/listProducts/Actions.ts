import { store } from '../../index';
import { setNewProduct, deleteProduct } from './Slice';

const { dispatch } = store;

export const addNewProduct = (data: string) => {
  dispatch(setNewProduct({ id: data, name: data }));
};

export const removeProduct = (data: string) => {
  dispatch(deleteProduct(data));
};

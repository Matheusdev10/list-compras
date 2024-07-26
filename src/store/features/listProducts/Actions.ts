import { store } from '../../index';
import { deleteProduct, IProduct, setNewProduct } from './Slice';

const { dispatch } = store;

export const addNewProduct = (data: IProduct) => {
  dispatch(setNewProduct(data));
};

export const removeProduct = (data: string) => {
  dispatch(deleteProduct(data));
};

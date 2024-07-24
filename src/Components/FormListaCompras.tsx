import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { addNewProduct } from '../store/features/listProducts/Actions';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IFormListaCompras {
  produto: string;
}

export function FormListaCompras() {
  const { products } = useSelector((state: RootState) => state.listProducts);
  const duplicateProduct = () => toast('Produto já cadastrado');
  const productNull = () => toast('Por favor, preencha o nome do produto');

  const { register, handleSubmit, reset } = useForm<IFormListaCompras>();
  const onSubmit = ({ produto }: IFormListaCompras) => {
    if (!produto) {
      productNull();
    } else {
      const findProduct = products.find((product) => product.name === produto);
      if (findProduct) {
        duplicateProduct();
      } else {
        addNewProduct(produto);
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <TextField label="Digite o produto" {...register('produto')} />

        <Button type="submit" variant="contained">
          Adicione o produto
        </Button>
        <ToastContainer />
      </div>
    </form>
  );
}

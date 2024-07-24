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

  const { register, handleSubmit, reset, watch } = useForm<IFormListaCompras>();
  const productWatch = watch('produto');
  const findProduct = products.find((product) => product.name === productWatch);
  const onSubmit = ({ produto }: IFormListaCompras) => {
    if (findProduct) {
      duplicateProduct();
    } else {
      productWatch && addNewProduct(produto);
      reset();
    }
    if (!productWatch) {
      productNull();
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

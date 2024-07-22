import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { addNewProduct } from '../store/features/listProducts/Actions';

interface IFormListaCompras {
  produto: string;
}

export function FormListaCompras() {
  const { register, handleSubmit } = useForm<IFormListaCompras>();
  const onSubmit = ({ produto }: IFormListaCompras) => addNewProduct(produto);

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
      </div>
    </form>
  );
}

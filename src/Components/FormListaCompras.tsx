// import { Button, TextField } from '@mui/material';
// import { addNewProduct } from '../store/features/listProducts/Actions';
// import { useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';
// import { IProduct } from '../store/features/listProducts/Slice';
// import { RootState } from '../store';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuid } from 'uuid';
// import { useDispatch } from 'react-redux';

// interface IFormListaCompras {
//   produto: string;
// }

// export function FormListaCompras() {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state: RootState) => state.listProducts);
//   const duplicateProduct = () => toast('Produto já cadastrado');
//   const productNull = () => toast('Por favor, preencha o nome do produto');

//   const { register, handleSubmit, reset } = useForm<IFormListaCompras>();
//   const onSubmit = ({ produto }: IFormListaCompras) => {
//     if (!produto) {
//       productNull();
//     } else {
//       const findProduct = products.find((product) => product.name === produto);
//       if (findProduct) {
//         duplicateProduct();
//       } else {
//         addNewProduct({ id: uuid(), name: produto });
//         reset();
//       }
//     }
//   };

//   useEffect(() => {
//     const produtosSalvos = localStorage.getItem('products');
//     if (produtosSalvos) {
//       try {
//         const parsedProducts: IProduct[] = JSON.parse(produtosSalvos);
//         // Atualiza o estado somente se a lista de produtos estiver vazia
//         if (products.length === 0) {
//           parsedProducts.forEach((product) => addNewProduct(product));
//         }
//       } catch (error) {
//         console.error('Erro ao parsear produtos do localStorage:', error);
//       }
//     }
//   }, [dispatch]);
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: 10,
//         }}
//       >
//         <TextField label="Digite o produto" {...register('produto')} />

//         <Button type="submit" variant="contained">
//           Adicione o produto
//         </Button>
//         <ToastContainer />
//       </div>
//     </form>
//   );
// }import { Button, TextField } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { IProduct } from '../store/features/listProducts/Slice';
import { RootState } from '../store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';
import { addNewProduct } from '../store/features/listProducts/Actions';

interface IFormListaCompras {
  produto: string;
}

export function FormListaCompras() {
  // const dispatch = useDispatch();
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
        addNewProduct({ id: uuid(), name: produto });
        reset();
      }
    }
  };

  useEffect(() => {
    // Carregar produtos do localStorage quando o componente é montado
    const produtosSalvos = localStorage.getItem('products');
    if (produtosSalvos) {
      try {
        const parsedProducts: IProduct[] = JSON.parse(produtosSalvos);
        console.log(parsedProducts);

        // Filtra produtos que não estão no estado atual
        const productsToAdd = parsedProducts.filter(
          (product) => !products.some((p) => p.id === product.id)
        );

        // Adiciona somente os produtos que não estão no estado
        productsToAdd.forEach((product) => addNewProduct(product));
      } catch (error) {
        console.error('Erro ao parsear produtos do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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

import { Container } from '@mui/material';
import { FormListaCompras } from '../Components/FormListaCompras';
import { TableProducts } from '../Components/TableProducts';

export function App() {
  return (
    <Container style={{ marginTop: 100 }}>
      <div>
        <FormListaCompras />
        <TableProducts />
      </div>
    </Container>
  );
}

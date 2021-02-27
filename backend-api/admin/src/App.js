import './App.css';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

const dataProvider = restProvider('http://localhost:4000');

function App() {
  return (
    <Admin dataProvider={dataProvider}>
    </Admin>
  );
}

export default App;

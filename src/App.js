import {Routes, Route} from 'react-router-dom';
import Auth from './component/auth/auth.component';
import Home from './component/routes/home/home.component';
import Navigation from './component/routes/navigation/navigation.component';
import Shop from './component/routes/shop/shop.component';
import Checkout from './component/routes/checkout/checkout.component';

const App = () => {
  return (
      <Routes>
          <Route path='/' element={<Navigation/>} >
              <Route index element={<Home/>} />
              <Route path='auth' element={<Auth/>} />
              <Route path='shop/*' element={<Shop/>} />
              <Route path='checkout' element={<Checkout/>} />
          </Route>
          
      </Routes>
  );
}

export default App;

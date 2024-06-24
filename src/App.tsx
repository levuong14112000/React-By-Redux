import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Product } from './model/product';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ProductPage from './features/product-crud/ProductPage';
import Header from './layout/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import Catalog from './features/catalog/Catalog';
import ProductDetail from './features/catalog/ProductDetail';
import AboutPage from './features/about/AboutPage';
import ContactPage from './features/contact/ContactPage';
import { ToastContainer } from 'react-toastify';
import ServerError from './features/error/ServerError';
import { AxiosIntercepter } from './interceptor/AxiosIntercepter';
import Error404 from './features/error/Error404';
import Basket from './features/basket/basket';
import axios, { AxiosResponse } from 'axios';
import { getCookie } from './util/util';
import { StoreContext } from './features/context/StoreContext';
import CheckoutPage from './features/basket/CheckoutPage';
import { store } from './store';
import { setBasketReducer } from './features/basket/basketSlice';


function App() {

  const [loading,setLoading] = useState<boolean>();
  const [darkMode, setDarkMode] = useState(false);
  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
    },
  });
  useEffect(() => {
    const buyerId = getCookie('buyerId');
    console.log(buyerId);
    if (buyerId) {
      axios.get('baskets')
        .then((response: AxiosResponse) => store.dispatch(setBasketReducer(response.data)))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AxiosIntercepter>
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} onSetDarkMode={setDarkMode}></Header>
      <Container>

        <Routes>
          <Route path='/' element={<HomePage />}  />
          <Route path='catalog' element={<Catalog/>}  />
          <Route path='catalog/:productId' element={<ProductDetail />}  />
          <Route path='about' element={<AboutPage />}  />
          <Route path='contact' element={<ContactPage />}  />
          <Route path='manage-product' element={<ProductPage/>} />
          <Route path='server-error' element={<ServerError/>} />
          <Route path='not-found' element={<Error404/>} />
          <Route path='basket' element={<Basket/>} />
          <Route path='checkout' element={<CheckoutPage/>} />

        </Routes>
      </Container>
    </ThemeProvider>
    </AxiosIntercepter>
  );
  }




export default App;

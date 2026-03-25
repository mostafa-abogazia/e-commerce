import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { Search } from './pages/Search';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'products',
        Component: Products,
      },
      {
        path: 'product/:id',
        Component: ProductDetail,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'checkout',
        Component: Checkout,
      },
      {
        path: 'wishlist',
        Component: Wishlist,
      },
      {
        path: 'search',
        Component: Search,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);

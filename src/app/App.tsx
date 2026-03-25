import React from 'react';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { ShopProvider } from './context/ShopContext';
import { router } from './routes';

function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </ShopProvider>
  );
}

export default App;

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Checkout = React.lazy(() => import(/* webpackChunkName: "Checkout" */ './pages/Checkout'));
const Service = React.lazy(() => import(/* webpackChunkName: "Service" */ './pages/Service'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/service"
          element={
            <Suspense>
              <Service />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense>
              <Checkout />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;

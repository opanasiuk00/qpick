import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Foooter';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

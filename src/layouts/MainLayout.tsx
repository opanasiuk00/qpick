import React from 'react';
import { Outlet } from 'react-router-dom';
import './mainLayout.scss';
import Footer from './components/Foooter';
import Header from './components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <>
        <Header />
        <main className="container my-4">
            <Outlet />
        </main>
        <Footer />
    </>
);

export default Layout;

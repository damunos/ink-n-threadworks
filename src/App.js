import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products/Products';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import DesignTool from './pages/DesignTool';
import AdminPanel from './pages/AdminPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:styleNumber', element: <ProductDetailPage /> },
    { path: '/design', element: <DesignTool /> },
    { path: '/admin', element: <AdminPanel /> },
  ];

  const element = useRoutes(routes);

  return (
    <div className="App">
      <Header />
      {element}
      <Footer />
    </div>
  );
}

export default App;

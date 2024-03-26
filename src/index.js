import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Styling/Pages/App.css';
// Pages Styling
import Home from './PageJSX/App.jsx';
import About from './PageJSX/About.jsx';
import Basket from './PageJSX/Basket.jsx';
import Shop from './PageJSX/Shop.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  </Router>
);

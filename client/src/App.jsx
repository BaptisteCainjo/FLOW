import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
import store from './features/store'
import { Provider } from 'react-redux';
import Verified from './pages/Verified.jsx';

export const GlobalContext = createContext();

export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verified" element={<Verified />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
    </Provider>
  )
}
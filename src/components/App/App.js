import React from 'react';
import { Router } from '@reach/router';

import { UserProvider } from '../../providers/UserProvider';
import Protected from '../Protected/Protected';
import Main from '../../views/Main/Main';
import Home from '../../views/Main/Home';
import Login from '../../views/Login/Login';
import Show from './Show';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Protected view={<Main/>} />} path={"/create"} />
          <Route element={<Login />} path="/login"/>
          <Route element={<Show />} path="/show/:id" />
          <Route element={<Home />} path="/" />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

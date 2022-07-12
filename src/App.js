import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { default as Layout } from './layouts';
import * as Pages from './pages';
import { legacy_createStore } from 'redux';
import allReducers from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = legacy_createStore(allReducers, devToolsEnhancer());

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Layout />
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="list" element={<Pages.List />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
        </div>
      </Provider>
    </>
  );
}

// <Route path="history" element={<Pages.History />} />

export default App;

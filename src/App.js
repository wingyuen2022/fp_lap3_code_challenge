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
            <Route path="/search" element={<Pages.Search />} />
            <Route path="/details/:github" element={<Pages.Details />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
          <br></br>
          <div className="align-center">
            <a href="https://github.com/wingyuen2022/fp_lap3_code_challenge" target="_blank"><b>futureproof github enquiry centre</b></a>
          </div>
          <div className="align-center">
            <b>Powered by: <a href="https://docs.github.com/en/rest" target="_blank">GitHub API</a></b>
          </div>
        </div>
      </Provider>
    </>
  );
}

// <Route path="history" element={<Pages.History />} />

export default App;

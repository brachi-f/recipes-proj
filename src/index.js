import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RecipeForm from './recipes/updateRec';
import reportWebVitals from './reportWebVitals';
import Recipe from './recipes/recipe';
import axios from "axios";
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App/>
    {/* <RecipeForm IdRecipe={1} isNew={true}/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

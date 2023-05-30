import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// note https://github.com/axios/axios/issues/2825 axios send request twice when using react strict mode HAHAHA
ReactDOM.createRoot(document.getElementById('root')).render(
  <>  <App />
  </>

  ,
)

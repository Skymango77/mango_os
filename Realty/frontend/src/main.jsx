import React from 'react'
import ReactDOM from 'react-dom/client'
// 확장자를 빼보거나, 파일명이 정확히 App.js인지 다시 확인하세요.
import App from './App.jsx' // 확장자 .jsx를 명시하거나 아예 빼세요.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Force purge all service workers & caches on Xiaomi / mobile browsers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
if ('caches' in window) {
  caches.keys().then((names) => {
    for (let name of names) caches.delete(name);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

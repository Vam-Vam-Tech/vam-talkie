import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import Routes from './routes'
import { store } from "./store"
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <NextUIProvider>
          <Routes />
        </NextUIProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
)

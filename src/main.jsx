import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './contexts/ContexProvider.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <ContextProvider>
   <RouterProvider router={router} />
   </ContextProvider>
    </QueryClientProvider>

 
  </React.StrictMode>,
)

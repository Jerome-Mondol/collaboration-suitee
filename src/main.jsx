import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from '@/context/Auth/AuthContext'
import './index.css'
import { TeamProvider } from './context/Dashboard/TeamContext'

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
  <TeamProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TeamProvider>
</AuthProvider>

)

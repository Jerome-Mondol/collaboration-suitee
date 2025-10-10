import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import SignupPage from '@/pages/auth/SignupPage';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';

const ProtectedRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<DashboardPage />}/>
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default ProtectedRoutes

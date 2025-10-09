import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import SignupPage from '@/pages/SignupPage';
import LoginPage from '@/pages/LoginPage';

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default PublicRoutes

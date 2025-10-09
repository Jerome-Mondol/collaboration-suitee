import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import SignupPage from '@/pages/SignupPage';

const PublicRoutes = () => {
  return (
    <Routes>
        
        <Route path="/signup" element={<SignupPage />}/>
    </Routes>
  )
}

export default PublicRoutes

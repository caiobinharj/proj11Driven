import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { ProgressContext } from './contexts/ProgressContext';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HabitsPage from './pages/HabitsPage';
import TodayPage from './pages/TodayPage';

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('trackitUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (user) {
            localStorage.setItem('trackitUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('trackitUser');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <ProgressContext.Provider value={{ progress, setProgress }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/cadastro" element={<SignupPage />} />
                        <Route path="/habitos" element={<HabitsPage />} />
                        <Route path="/hoje" element={<TodayPage />} />
                    </Routes>
                </BrowserRouter>
            </ProgressContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
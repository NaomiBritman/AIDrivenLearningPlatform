import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import HistoryPage from './pages/HistoryPage';

function App() {
    // בדיקת מצב התחברות ותפקיד המשתמש מ-localStorage
    const isLoggedIn = !!localStorage.getItem('user_id');
    const userRole = localStorage.getItem('role');
    const defaultPage = userRole === 'Admin' ? '/admin' : '/customer';
    
    return (
        <BrowserRouter>
            <Routes>
                {/* ניתוב מחדש לעמוד המתאים לפי מצב התחברות */}
                <Route path="/" element={<Navigate to={isLoggedIn ? defaultPage : '/signin'} />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

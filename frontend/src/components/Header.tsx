import { useNavigate, useLocation } from 'react-router-dom';

// רכיב כותרת עליון עם ניווט והתנתקות לפי תפקיד המשתמש
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem('user_name');
    const userRole = localStorage.getItem('role');
    const isAdmin = userRole === 'Admin';

    const handleLogout = () => {
        localStorage.clear(); // ניקוי כל נתוני המשתמש מהאחסון המקומי
        navigate('/signin');
    };

    return (
        <header className="header">
            <span className="header-logo">AI TEACHER</span>
            <nav className="header-nav">
                {userName && (
                    <>
                        <span className="header-user">Hello, {userName}</span>
                        {/* הצגת כפתור Admin רק למנהלים */}
                        {isAdmin && location.pathname !== '/admin' && (
                            <button className="btn-outline" onClick={() => navigate('/admin')}>Admin Panel</button>
                        )}
                        <button className="btn-ghost" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
}

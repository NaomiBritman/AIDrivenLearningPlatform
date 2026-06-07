import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAdmin } from '../hooks/useAdmin';

// עמוד מנהל לצפייה בכל השאלות ותשובות של כל המשתמשים
export default function AdminPage() {
    const { prompts, loading } = useAdmin();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    // בדיקת הרשאות מנהל - רק משתמשים עם תפקיד Admin יכולים לגשת
    useEffect(() => {
        if (userRole !== 'Admin') {
            alert('Access denied. Admins only.');
            navigate('/customer');
        }
    }, [userRole, navigate]);

    const toggleItem = (index: number) => {
        setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="admin-page">
            <Header />
            <div className="admin-content">
                <h2>Admin Panel</h2>
                {loading ? <p className="loading">Loading...</p> : (
                    <div className="table-card">
                        {/* טבלת נתונים של כל השאלות ותשובות במערכת */}
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    {['User ID', 'Category', 'Sub-Category', 'Prompt', 'Response', 'Date', 'Actions'].map(h => (
                                        <th key={h}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {prompts.map((p, i) => {
                                    const isExpanded = !!expanded[i];
                                    return (
                                        <tr key={i}>
                                            <td>{p.user_id}</td>
                                            <td>{p.category_id}</td>
                                            <td>{p.sub_category_id}</td>
                                            <td style={{ maxWidth: '300px' }}>
                                                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    {isExpanded ? p.prompt : `${p.prompt.slice(0, 100)}...`}
                                                </div>
                                            </td>
                                            <td style={{ maxWidth: '400px' }}>
                                                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                    {isExpanded ? p.response : `${p.response.slice(0, 100)}...`}
                                                </div>
                                            </td>
                                            <td>{new Date(p.created_at).toLocaleString()}</td>
                                            <td>
                                                <button 
                                                    type="button"
                                                    className="history-toggle-btn" 
                                                    onClick={() => toggleItem(i)}>
                                                    {isExpanded ? 'הסתר' : 'הצג הכל'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {prompts.length === 0 && <p className="admin-empty">No prompts yet.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

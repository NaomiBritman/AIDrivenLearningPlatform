import { useState } from 'react';
import Header from '../components/Header';
import { useHistory } from '../hooks/useHistory';

// עמוד היסטוריית למידה נפרד - הצגת כל השאלות ותשובות של המשתמש
export default function HistoryPage() {
    const { history, loading } = useHistory();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="history-page">
            <Header />
            <div className="history-content">
                <h2>Learning History</h2>
                {loading ? <p className="loading">Loading...</p> : (
                    <>
                        {history.length === 0
                            ? <p className="history-empty">No history yet. Start asking questions!</p>
                            : history.map((item, i) => {
                                const key = item.id ?? String(i);
                                const isExpanded = !!expanded[key];

                                return (
                                    <div key={key} className="history-item">
                                        <p className="history-item-question">Q: {item.prompt}</p>
                                        <p className="history-item-response">
                                            {isExpanded ? item.response : `${item.response.slice(0, 200)}...`}
                                        </p>
                                        <button
                                            className="history-toggle-btn"
                                            onClick={() => toggleItem(key)}>
                                            {isExpanded ? 'הסתר' : 'הצג הכל'}
                                        </button>
                                        <span className="history-item-meta">{new Date(item.created_at).toLocaleString()}</span>
                                    </div>
                                );
                            })
                        }
                    </>
                )}
            </div>
        </div>
    );
}


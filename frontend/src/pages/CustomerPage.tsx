import { useMemo, useState } from 'react';
import Header from '../components/Header';
import { useDashboard } from '../hooks/useDashboard';
import { useHistory } from '../hooks/useHistory';

// עמוד הלמידה הראשי - משלב בין שאלות ל-AI והיסטוריית למידה
export default function CustomerPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');
    const {
        categories, subCategories, selectedCategory, setSelectedCategory,
        selectedSubCategory, setSelectedSubCategory,
        promptText, setPromptText, response, loading, error, submit
    } = useDashboard();

    const { history, loading: historyLoading } = useHistory();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="page">
            <Header />
            <div className="page-content">
                {/* ניווט בין שאלות חדשות להיסטוריית למידה */}
                <div className="tabs">
                    <span
                        className={`tab ${activeTab === 'dashboard' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}>
                        Ask AI Teacher
                    </span>
                    <span
                        className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('history')}>
                        History
                    </span>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        {/* בחירת קטגוריה ותת-קטגוריה לפני שליחת השאלה */}
                        <div className="card">
                            <h3>Select Topic</h3>
                            <div className="form-row">
                                <select className="select" onChange={e => {
                                    const cat = categories.find(c => c.id === e.target.value) || null;
                                    setSelectedCategory(cat);
                                }} value={selectedCategory?.id || ''}>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>

                                <select className="select" onChange={e => {
                                    const sub = subCategories.find(s => s.id === e.target.value) || null;
                                    setSelectedSubCategory(sub);
                                }} value={selectedSubCategory?.id || ''} disabled={!selectedCategory}>
                                    <option value="">Select Sub-Category</option>
                                    {subCategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="card">
                            <h3>Your Question</h3>
                            <textarea className="textarea"
                                placeholder="Type your question here..."
                                value={promptText}
                                onChange={e => setPromptText(e.target.value)}
                                rows={5}
                            />
                            <button className="btn-primary" onClick={submit}
                                disabled={loading || !selectedSubCategory || !promptText}>
                                {loading ? 'Thinking...' : 'Submit'}
                            </button>
                            {error && <p className="error-msg">{error}</p>}
                            {response && (
                                <div className="ai-response">
                                    <h4>AI Response</h4>
                                    <p>{response}</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <div className="card">
                        {historyLoading ? <p className="loading">Loading...</p> : (
                            <>
                                {history.length === 0
                                    ? <p className="history-empty">No history yet.</p>
                                    : history.map((item, i) => {
                                        const key = item.id ?? String(i);
                                        const isExpanded = !!expanded[key];

                                        return (
                                            <div key={key} className="history-item">
                                                <p className="history-item-question">Q: {item.prompt}</p>
                                                <p className="history-item-response">
                                                    {isExpanded ? item.response : `${item.response.slice(0, 200)}...`}
                                                </p>

                                                <div className="history-item-actions">
                                                    <button
                                                        type="button"
                                                        className="history-toggle-btn"
                                                        onClick={() => toggleItem(key)}>
                                                        {isExpanded ? 'הסתר' : 'הצג הכל'}
                                                    </button>
                                                </div>

                                                <span className="history-item-meta">{new Date(item.created_at).toLocaleString()}</span>
                                            </div>
                                        );
                                    })
                                }
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


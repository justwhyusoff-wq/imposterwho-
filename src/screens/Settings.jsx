import { useState } from 'react'
import { addCustomWord, getCustomWords } from '../words'

export default function Settings({ onBack }) {
  const [word, setWord] = useState('')
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(null) // 'added' | 'dup' | null

  function handleAdd() {
    const clean = word.trim()
    if (!clean) return
    const ok = addCustomWord(clean)
    if (ok !== false) {
      setStatus('added')
      setWord('')
      setVisible(false)
    } else {
      setStatus('dup')
    }
    setTimeout(() => setStatus(null), 2500)
  }

  const total = getCustomWords().length

  return (
    <div className="screen admin-screen">
      <div className="round-tag">⚙️ Zid Klma Custom</div>

      <section className="card">
        <div className="card-head">
          <h2>Klmtek Sirr</h2>
          <span className="pill">{total} active</span>
        </div>

        <p className="hint" style={{ marginTop: 0, marginBottom: 14 }}>
          Kull wa7ed yzid klmtu — ma ychuf 7add l-klmat d-l-khrin
        </p>

        <div className="word-input-wrap">
          <input
            className="name-input word-secret-input"
            type={visible ? 'text' : 'password'}
            autoComplete="off"
            placeholder="klmtek hna..."
            value={word}
            maxLength={20}
            autoFocus
            onChange={(e) => { setWord(e.target.value); setStatus(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            className="eye-btn"
            onClick={() => setVisible(!visible)}
            type="button"
          >
            {visible ? '🙈' : '👁️'}
          </button>
        </div>

        {status === 'added' && (
          <p className="status-msg success">✅ Tzadat! Zid klma okhra wlla rja3</p>
        )}
        {status === 'dup' && (
          <p className="status-msg danger">⚠️ Had l-klma kayna deja f l-lista</p>
        )}

        <button
          className="primary-btn"
          style={{ marginTop: 14, width: '100%' }}
          onClick={handleAdd}
          disabled={!word.trim()}
        >
          + Zid l-Klma
        </button>
      </section>

      <div className="card info-card">
        <p className="hint" style={{ margin: 0, textAlign: 'center' }}>
          🔒 Ma kayn 7add lli ychuf klmat l-khrin ghir l-Admin
        </p>
      </div>

      <button className="ghost-btn" style={{ marginTop: 'auto' }} onClick={onBack}>
        ← Rja3 l-Li3ba
      </button>
    </div>
  )
}

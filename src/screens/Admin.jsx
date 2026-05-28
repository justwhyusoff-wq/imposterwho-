import { useState } from 'react'
import { getCustomWords, getUsedWords, deleteCustomWord, deleteUsedWord, refillWords } from '../words'

function useWordLists() {
  const [tick, setTick] = useState(0)
  const refresh = () => setTick((t) => t + 1)
  return { active: getCustomWords(), used: getUsedWords(), refresh }
}

export default function Admin({ onBack }) {
  const { active, used, refresh } = useWordLists()
  const [confirmIdx, setConfirmIdx] = useState(null)
  const [confirmType, setConfirmType] = useState(null)

  function handleDelete(index, type) {
    const key = `${type}-${index}`
    if (confirmIdx === key) {
      if (type === 'active') deleteCustomWord(index)
      else deleteUsedWord(index)
      refresh()
      setConfirmIdx(null)
      setConfirmType(null)
    } else {
      setConfirmIdx(key)
      setConfirmType(type)
    }
  }

  function handleRefill() {
    refillWords()
    refresh()
    setConfirmIdx(null)
  }

  return (
    <div className="screen admin-screen">
      <div className="round-tag">🔐 Admin — L-Klam Custom</div>

      {/* Active words */}
      <section className="card">
        <div className="card-head">
          <h2>✅ Active — Jahzin</h2>
          <span className="pill">{active.length} klma</span>
        </div>

        {active.length === 0 ? (
          <div className="empty-admin">
            <div style={{ fontSize: '2.5rem' }}>🫙</div>
            <p className="hint" style={{ textAlign: 'center', marginTop: 8 }}>
              Ma kaynach klam active.<br />
              {used.length > 0 ? 'Dir "Refill" bach trja3hom.' : 'Dkhol l-I3dadat bach tzid.'}
            </p>
          </div>
        ) : (
          <div className="word-list">
            {active.map((word, i) => (
              <div className="word-row" key={i}>
                <span className="word-text">{word}</span>
                <button
                  className={`delete-btn ${confirmIdx === `active-${i}` ? 'delete-confirm' : ''}`}
                  onClick={() => handleDelete(i, 'active')}
                >
                  {confirmIdx === `active-${i}` ? 'Akid?' : '7ddef'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Used/expired words */}
      {used.length > 0 && (
        <section className="card">
          <div className="card-head">
            <h2>⏳ St3mlaw — Khdaw</h2>
            <span className="pill">{used.length} klma</span>
          </div>
          <p className="hint" style={{ marginTop: 0, marginBottom: 12 }}>
            Had l-klmat st3mlaw f l-li3ba — dir Refill bach trja3hom
          </p>
          <div className="word-list">
            {used.map((word, i) => (
              <div className="word-row used-row" key={i}>
                <span className="word-text dim-word">{word}</span>
                <button
                  className={`delete-btn ${confirmIdx === `used-${i}` ? 'delete-confirm' : ''}`}
                  onClick={() => handleDelete(i, 'used')}
                >
                  {confirmIdx === `used-${i}` ? 'Akid?' : '7ddef'}
                </button>
              </div>
            ))}
          </div>

          <button className="refill-btn" onClick={handleRefill} style={{ marginTop: 14 }}>
            🔄 Refill — Rja3 Kull l-Klam Active
          </button>
        </section>
      )}

      {confirmIdx !== null && (
        <p className="hint" style={{ textAlign: 'center', color: 'var(--danger)' }}>
          Click mrrten bach t7ddef
        </p>
      )}

      <button className="ghost-btn" style={{ marginTop: 12 }} onClick={onBack}>
        ← Rja3 l-Li3ba
      </button>
    </div>
  )
}

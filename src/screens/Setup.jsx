import { useState } from 'react'
import { CATEGORY_NAMES, getCustomWords } from '../words'

const ALL_CATEGORIES = ['Kull Chi', ...CATEGORY_NAMES, 'Custom']
const ADMIN_CODE = 'admin'
const MIN_CUSTOM = 5

export default function Setup({ initialNames, onStart, onAdmin, onSettings }) {
  const [names, setNames] = useState(
    initialNames && initialNames.length >= 3 ? initialNames : ['', '', '']
  )
  const [imposterCount, setImposterCount] = useState(1)
  const [category, setCategory] = useState('Kull Chi')
  const [showAdminInput, setShowAdminInput] = useState(false)
  const [adminInput, setAdminInput] = useState('')
  const [adminError, setAdminError] = useState(false)

  const filled = names.map((n) => n.trim()).filter(Boolean)
  const maxImposters = Math.min(5, Math.max(1, filled.length - 1))
  const count = Math.min(imposterCount, maxImposters)
  const activeCustom = getCustomWords()
  const customCount = activeCustom.length
  const enoughCustom = category !== 'Custom' || customCount >= MIN_CUSTOM
  const canStart = filled.length >= 3 && filled.length === names.length && enoughCustom

  function setName(i, value) {
    const next = [...names]
    next[i] = value
    setNames(next)
  }

  function addPlayer() {
    if (names.length < 30) setNames([...names, ''])
  }

  function removePlayer(i) {
    if (names.length > 3) setNames(names.filter((_, idx) => idx !== i))
  }

  function start() {
    onStart({ names: filled, imposterCount: count, category })
  }

  function tryAdmin() {
    if (adminInput === ADMIN_CODE) {
      setAdminInput('')
      setAdminError(false)
      setShowAdminInput(false)
      onAdmin()
    } else {
      setAdminError(true)
      setAdminInput('')
    }
  }

  return (
    <div className="screen setup">
      <header className="brand">
        <div className="brand-top">
          <div className="brand-spacer" />
          <h1>Kddab <span className="who">SHKUN?</span></h1>
          <button
            className="admin-access-btn"
            onClick={() => { setShowAdminInput(!showAdminInput); setAdminError(false); setAdminInput('') }}
            title="Admin"
          >
            🔐
          </button>
        </div>
        <p className="tagline">Li3ba d-jama3 — wah tlefun ghir 📱</p>
      </header>

      {showAdminInput && (
        <div className="card admin-login-card">
          <p className="hint" style={{ margin: '0 0 10px', textAlign: 'center' }}>
            Dkhel l-code d-admin
          </p>
          <div className="admin-input-row">
            <input
              className="name-input"
              type="password"
              placeholder="Code..."
              value={adminInput}
              autoFocus
              onChange={(e) => { setAdminInput(e.target.value); setAdminError(false) }}
              onKeyDown={(e) => e.key === 'Enter' && tryAdmin()}
            />
            <button
              className="primary-btn"
              style={{ padding: '13px 18px', marginTop: 0 }}
              onClick={tryAdmin}
            >
              Dkhol
            </button>
          </div>
          {adminError && (
            <p className="hint" style={{ color: 'var(--danger)', textAlign: 'center', marginTop: 8 }}>
              ❌ L-code khta3 — probwih mrrra
            </p>
          )}
        </div>
      )}

      <section className="card">
        <div className="card-head">
          <h2>L-La3bin</h2>
          <span className="pill">{filled.length} zad</span>
        </div>

        <div className="player-list">
          {names.map((name, i) => (
            <div className="player-row" key={i}>
              <span className="player-num">{i + 1}</span>
              <input
                className="name-input"
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder={`La3eb ${i + 1}`}
                value={name}
                maxLength={16}
                onChange={(e) => setName(i, e.target.value)}
              />
              <button
                className="icon-btn remove"
                onClick={() => removePlayer(i)}
                disabled={names.length <= 3}
                aria-label="7ddef"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button className="ghost-btn" onClick={addPlayer}>
          + Zid La3eb
        </button>
        <p className="hint">7sn 3 la3bin bzzaf.</p>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>L-Kddabin</h2>
        </div>
        <div className="stepper">
          <button
            className="step-btn"
            onClick={() => setImposterCount(Math.max(1, count - 1))}
            disabled={count <= 1}
          >–</button>
          <div className="step-value">
            <strong>{count}</strong>
            <small>{count > 1 ? 'kddabin' : 'kddab'}</small>
          </div>
          <button
            className="step-btn"
            onClick={() => setImposterCount(Math.min(maxImposters, count + 1))}
            disabled={count >= maxImposters}
          >+</button>
        </div>
        <p className="hint">1 l {maxImposters} (7ssb 3dad la3bin).</p>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Mawdou3 d-L-Klam</h2>
        </div>
        <div className="chips">
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? 'active' : ''} ${c === 'Custom' ? 'chip-custom' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c === 'Custom'
                ? `⭐ Custom${customCount > 0 ? ` (${customCount})` : ''}`
                : c}
            </button>
          ))}
        </div>
        {category === 'Custom' && !enoughCustom && (
          <p className="hint" style={{ color: 'var(--danger)', marginTop: 10 }}>
            ❗ 7tajin 3la 7al {MIN_CUSTOM} klmat — 3andkom {customCount}.{' '}
            <button className="inline-link" onClick={onSettings}>Zid klam</button>
          </p>
        )}
        {category === 'Custom' && enoughCustom && (
          <p className="hint custom-hint">
            ✅ {customCount} klma active — jahzin!
          </p>
        )}
      </section>

      <button className="primary-btn big" onClick={start} disabled={!canStart}>
        {!filled.length || filled.length < 3
          ? 'Dkhel 3la 7al 3 isimat'
          : !enoughCustom
          ? `Custom: 7tajin ${MIN_CUSTOM - customCount} klmat ziyada`
          : 'Bda l-Li3ba 🎮'}
      </button>

      <button className="ghost-btn settings-btn" onClick={onSettings}>
        ⚙️ Zid Klam Custom
      </button>
    </div>
  )
}

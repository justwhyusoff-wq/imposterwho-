import { useState } from 'react'

export default function WordCollection({ playerName, index, total, onDone }) {
  const [shown, setShown] = useState(false)
  const [word, setWord] = useState('')
  const [visible, setVisible] = useState(false)

  if (!shown) {
    return (
      <div className="screen reveal pass">
        <div className="round-tag">⭐ Custom — {index + 1} / {total}</div>
        <div className="pass-body">
          <p className="pass-label">Dir l-tlefun l</p>
          <h1 className="pass-name">{playerName}</h1>
          <p className="pass-warn">Dir bali ma ychuf 7add 👀</p>
        </div>
        <button className="primary-btn big" onClick={() => setShown(true)}>
          Ana {playerName} — Dkhel klmti
        </button>
        <p className="counter">La3eb {index + 1} mn {total}</p>
      </div>
    )
  }

  return (
    <div className="screen reveal card-screen">
      <div className="round-tag">⭐ {playerName} — Klmtek Sirriya</div>
      <div className="role-card">
        <div className="role-emoji">🤫</div>
        <p className="role-label">Dkhel klma sirr</p>
        <div className="word-input-wrap">
          <input
            className="name-input word-secret-input"
            type={visible ? 'text' : 'password'}
            autoComplete="off"
            placeholder="klmtek hna..."
            value={word}
            maxLength={20}
            onChange={e => setWord(e.target.value)}
            autoFocus
          />
          <button
            className="eye-btn"
            onClick={() => setVisible(!visible)}
            type="button"
            aria-label={visible ? 'khbbi' : 'wrrini'}
          >
            {visible ? '🙈' : '👁️'}
          </button>
        </div>
        <p className="role-sub">Ma tchofha 7add ghirek 🤫</p>
        <p className="role-sub dim-small">
          {word.trim() ? '' : 'Imken t3ddiha bla ma tzid klma'}
        </p>
      </div>
      <button
        className="primary-btn big"
        onClick={() => onDone(word)}
      >
        {word.trim() ? 'Mkemmel ✓' : 'T3ddi — bla klma'}
      </button>
    </div>
  )
}

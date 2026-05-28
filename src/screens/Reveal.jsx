import { useState } from 'react'

export default function Reveal({
  name, isImposter, word, index, total, round, totalRounds, onHide,
}) {
  const [shown, setShown] = useState(false)
  const isLast = index === total - 1

  if (!shown) {
    return (
      <div className="screen reveal pass">
        <div className="round-tag">
          Jouha {round} mn {totalRounds}
        </div>
        <div className="pass-body">
          <p className="pass-label">Dir l-tlefun l</p>
          <h1 className="pass-name">{name}</h1>
          <p className="pass-warn">Dir bali ma ychuf 7add 👀</p>
        </div>
        <button className="primary-btn big" onClick={() => setShown(true)}>
          Ana {name} — Wrrini klmti
        </button>
        <p className="counter">
          La3eb {index + 1} mn {total}
        </p>
      </div>
    )
  }

  return (
    <div className={`screen reveal card-screen ${isImposter ? 'is-imposter' : ''}`}>
      <div className="round-tag">
        Sirr {name}
      </div>
      <div className="role-card">
        {isImposter ? (
          <>
            <div className="role-emoji">🕵️</div>
            <p className="role-label">Nta</p>
            <h1 className="role-word imposter">L-KDDAB!</h1>
            <p className="role-sub">Dhher bnin. Ma t9be3ch.</p>
          </>
        ) : (
          <>
            <p className="role-label">Klmtek s-Sirriya</p>
            <h1 className="role-word">{word}</h1>
            <p className="role-sub">Qlleb 3la l-kddab bla ma tguliha.</p>
          </>
        )}
      </div>
      <button className="primary-btn big" onClick={onHide}>
        {isLast ? 'Khbbi — Kulshi sara3 ✓' : 'Khbbi w dir l-tlefun →'}
      </button>
    </div>
  )
}

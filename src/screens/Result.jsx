export default function Result({ word, imposterNames, round, totalRounds, onNextRound, onNewGame }) {
  const isLastRound = round >= totalRounds
  const multiple = imposterNames.length > 1

  return (
    <div className="screen result">
      <div className="round-tag">
        Jouha {round} mn {totalRounds}
      </div>

      <div className="result-body">
        <div className="big-emoji">🎭</div>
        <p className="result-label">{multiple ? 'L-kddabin kanu' : 'L-kddab kan'}</p>
        <div className="imposter-names">
          {imposterNames.map((n, i) => (
            <span className="imposter-name" key={i}>{n}</span>
          ))}
        </div>

        <div className="word-reveal">
          <p className="result-label">L-Klma s-Sirriya</p>
          <h2 className="result-word">{word}</h2>
        </div>
      </div>

      <div className="result-actions">
        {!isLastRound ? (
          <button className="primary-btn big" onClick={onNextRound}>
            Jouha Jdida →
          </button>
        ) : (
          <p className="game-over">🏁 Hadi kanet a5er jouha!</p>
        )}
        <button className="ghost-btn" onClick={onNewGame}>
          Li3ba Jdida / Beddel La3bin
        </button>
      </div>
    </div>
  )
}

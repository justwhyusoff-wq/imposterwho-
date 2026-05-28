export default function Discuss({ round, totalRounds, playerCount, imposterCount, onReveal }) {
  return (
    <div className="screen discuss">
      <div className="round-tag">
        Jouha {round} mn {totalRounds}
      </div>
      <div className="discuss-body">
        <div className="big-emoji">🗣️</div>
        <h1>Kulshi da5el!</h1>
        <p className="discuss-text">
          Kull wa7ed y3ti icha3ra wa7da 3la klmtu — bla ma ygouliha.{' '}
          {imposterCount > 1 ? `${imposterCount} kddabin` : '1 kddab'} kaykhbba
          {imposterCount > 1 ? 'w' : ''} bin {playerCount} la3bin.
        </p>
        <p className="discuss-text dim">
          Hdrw m3ba3dkum, mn b3d wrriwah mni wssoltou l-7ukm.
        </p>
      </div>
      <button className="primary-btn big" onClick={onReveal}>
        Wssalna — Wrriwah l-Kddab 🎭
      </button>
    </div>
  )
}

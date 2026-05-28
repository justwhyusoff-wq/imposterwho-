import { useState } from 'react'
import { pickWord, markWordUsed } from './words'
import Setup from './screens/Setup'
import Reveal from './screens/Reveal'
import Discuss from './screens/Discuss'
import Result from './screens/Result'
import Admin from './screens/Admin'
import Settings from './screens/Settings'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [phase, setPhase] = useState('setup')
  const [players, setPlayers] = useState([])
  const [imposterCount, setImposterCount] = useState(1)
  const [category, setCategory] = useState('Kull Chi')
  const [round, setRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(3)
  const [secretWord, setSecretWord] = useState('')
  const [imposters, setImposters] = useState([])
  const [revealIndex, setRevealIndex] = useState(0)

  function deal(playersArr, count, cat, prevWord) {
    const word = pickWord(cat, prevWord)
    if (cat === 'Custom') markWordUsed(word)
    const order = shuffle(playersArr.map((_, i) => i))
    setSecretWord(word)
    setImposters(order.slice(0, count))
    setRevealIndex(0)
    setPhase('reveal')
  }

  function startGame({ names, imposterCount: count, category: cat }) {
    setPlayers(names)
    setImposterCount(count)
    setCategory(cat)
    setTotalRounds(names.length)
    setRound(1)
    deal(names, count, cat, null)
  }

  function handleHide() {
    if (revealIndex < players.length - 1) {
      setRevealIndex(revealIndex + 1)
    } else {
      setPhase('discuss')
    }
  }

  function nextRound() {
    setRound(round + 1)
    deal(players, imposterCount, category, secretWord)
  }

  function newGame() {
    setPhase('setup')
  }

  return (
    <div className="app">
      {phase === 'setup' && (
        <Setup
          initialNames={players}
          onStart={startGame}
          onAdmin={() => setPhase('admin')}
          onSettings={() => setPhase('settings')}
        />
      )}

      {phase === 'reveal' && (
        <Reveal
          key={revealIndex}
          name={players[revealIndex]}
          isImposter={imposters.includes(revealIndex)}
          word={secretWord}
          index={revealIndex}
          total={players.length}
          round={round}
          totalRounds={totalRounds}
          onHide={handleHide}
        />
      )}

      {phase === 'discuss' && (
        <Discuss
          round={round}
          totalRounds={totalRounds}
          playerCount={players.length}
          imposterCount={imposterCount}
          onReveal={() => setPhase('result')}
        />
      )}

      {phase === 'result' && (
        <Result
          word={secretWord}
          imposterNames={imposters.map((i) => players[i])}
          round={round}
          totalRounds={totalRounds}
          onNextRound={nextRound}
          onNewGame={newGame}
        />
      )}

      {phase === 'admin' && <Admin onBack={() => setPhase('setup')} />}
      {phase === 'settings' && <Settings onBack={() => setPhase('setup')} />}
    </div>
  )
}

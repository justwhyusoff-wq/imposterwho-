// Klam d-li3ba — kull chi b-darija 🇲🇦

const KEY_ACTIVE = 'darija_custom_words'
const KEY_USED   = 'darija_used_words'

export const getCustomWords = () => {
  try { return JSON.parse(localStorage.getItem(KEY_ACTIVE) || '[]') } catch { return [] }
}

export const getUsedWords = () => {
  try { return JSON.parse(localStorage.getItem(KEY_USED) || '[]') } catch { return [] }
}

export const addCustomWord = (word) => {
  const trimmed = word.trim()
  if (!trimmed) return false
  const active = getCustomWords()
  const used = getUsedWords()
  const all = [...active, ...used]
  if (all.map((w) => w.toLowerCase()).includes(trimmed.toLowerCase())) return false
  active.push(trimmed)
  localStorage.setItem(KEY_ACTIVE, JSON.stringify(active))
  return true
}

export const deleteCustomWord = (index) => {
  const words = getCustomWords()
  words.splice(index, 1)
  localStorage.setItem(KEY_ACTIVE, JSON.stringify(words))
}

export const deleteUsedWord = (index) => {
  const words = getUsedWords()
  words.splice(index, 1)
  localStorage.setItem(KEY_USED, JSON.stringify(words))
}

export const markWordUsed = (word) => {
  const active = getCustomWords()
  if (active.length <= 5) return // 7fad mn 5 klmat — ma t-expires
  const idx = active.findIndex((w) => w.toLowerCase() === word.toLowerCase())
  if (idx === -1) return
  active.splice(idx, 1)
  localStorage.setItem(KEY_ACTIVE, JSON.stringify(active))
  const used = getUsedWords()
  if (!used.map((w) => w.toLowerCase()).includes(word.toLowerCase())) used.push(word)
  localStorage.setItem(KEY_USED, JSON.stringify(used))
}

export const refillWords = () => {
  const used = getUsedWords()
  if (!used.length) return
  const active = getCustomWords()
  const combined = [...new Set([...active, ...used])]
  localStorage.setItem(KEY_ACTIVE, JSON.stringify(combined))
  localStorage.removeItem(KEY_USED)
}

export const clearCustomWords = () => {
  localStorage.removeItem(KEY_ACTIVE)
  localStorage.removeItem(KEY_USED)
}

export const CATEGORIES = {
  'L-Makla': [
    'couscous', 'tajin', 'harira', 'msemen', 'baghrir', 'sfenj',
    'briwat', 'rfissa', 'sellou', 'chebakia', 'bastilla', 'zalouk',
    'bissara', 'maaqoda', 'mrouzia', 'trid', 'ksra', 'm7ammar',
    'chermoula', 'mechoui',
  ],
  'L-Mahallat': [
    'hammam', 'medina', 'soq', 'derb', 'riad', 'qahhwa', 'msjed',
    'plage', 'kasbah', 'fundoq', 'dar', 'sinima', 'jami3a', 'spital',
    'matar', 'station', '7anout', 'ferran', 'maktaba', 'qisariya',
  ],
  'L-Khedma': [
    'tbib', 'mouderris', 'tyyar', 'tabakh', 'pompier', 'jandar',
    'moudir', 'khayat', 'm3allem', 'farran', '3attar', 'sarraf',
    'gardien', 'chauffeur', 'la7am', 'berrad', 'filah', 'mohandis',
    'mkanisi', 'tterjas',
  ],
  'L-Hayawanat': [
    'lkelb', 'lqett', 'lhmar', 'l3rd', 'ljml', 'lfiil', 'lbqra',
    'l3nza', 'dik', 'djaja', 'lhut', 'lferrouj', 'lqnfod', 'lb3ir',
    'lferd', 'nnaml', 'l7ayya', 'l3sfour', 'lbtal', 'lghrabe',
  ],
  'L-Mdun': [
    'casa', 'rbat', 'fes', 'marrakech', 'tanja', 'meknes', 'oujda',
    'agadir', 'tetouan', 'kenitra', 'sal3', 'nador', 'settat',
    'bni mllal', 'jdida', 'safi', 'xribeqa', 'taza', 'rashidiya', 'dakhla',
  ],
}

export const CATEGORY_NAMES = Object.keys(CATEGORIES)

export function pickWord(category, avoid, sessionWords = []) {
  let pool
  if (category === 'Custom') {
    const stored = getCustomWords()
    pool = [...new Set([...sessionWords, ...stored])]
  } else if (category === 'Kull Chi') {
    pool = [...CATEGORY_NAMES.flatMap((c) => CATEGORIES[c]), ...getCustomWords()]
  } else {
    pool = CATEGORIES[category] || []
  }
  if (!pool.length) pool = CATEGORY_NAMES.flatMap((c) => CATEGORIES[c])
  const choices = pool.length > 1 ? pool.filter((w) => w !== avoid) : pool
  return choices[Math.floor(Math.random() * choices.length)]
}

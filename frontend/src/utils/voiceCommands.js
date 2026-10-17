/**
 * Voice command definitions and matching logic.
 * Each command has keyword patterns and an action to execute.
 */

const ROUTE_COMMANDS = [
  { keywords: ['home', 'go home', 'main page', 'homepage'],          route: '/' },
  { keywords: ['cart', 'shopping cart', 'my cart', 'open cart'],       route: '/cart' },
  { keywords: ['order', 'my order', 'orders', 'show order'],          route: '/orders' },
  { keywords: ['profile', 'my profile', 'account', 'my account'],     route: '/profile' },
  { keywords: ['collection', 'collections', 'browse', 'shop'],        route: '/collection' },
  { keywords: ['about', 'about us', 'about page'],                    route: '/about' },
  { keywords: ['contact', 'contact us', 'support', 'help'],           route: '/contact' },
  { keywords: ['place order', 'checkout', 'check out', 'placeorder'], route: '/place-order' },
  { keywords: ['login', 'log in', 'sign in', 'signin'],               route: '/login' },
  { keywords: ['signup', 'sign up', 'register', 'create account'],    route: '/signup' },
]

const SEARCH_PREFIXES = ['search for', 'search', 'find', 'look for', 'show me']

/**
 * Normalizes transcript text for matching.
 */
export function normalizeTranscript(text) {
  return text.toLowerCase().trim().replace(/[.,!?]/g, '')
}

/**
 * Parses a voice transcript into an actionable command.
 * Returns { type, route?, query?, raw }
 */
export function parseVoiceCommand(transcript) {
  const text = normalizeTranscript(transcript)

  // Check search commands first (longer match takes priority)
  for (const prefix of SEARCH_PREFIXES) {
    if (text.startsWith(prefix)) {
      const query = text.slice(prefix.length).trim()
      if (query) {
        return { type: 'search', query, raw: transcript }
      }
    }
  }

  // Check route-based navigation commands
  for (const cmd of ROUTE_COMMANDS) {
    for (const keyword of cmd.keywords) {
      if (text.includes(keyword)) {
        return { type: 'navigate', route: cmd.route, raw: transcript }
      }
    }
  }

  return { type: 'unknown', raw: transcript }
}

/**
 * Executes a parsed command using the provided handlers.
 * @param {Object} command - parsed command from parseVoiceCommand
 * @param {Function} navigate - react-router navigate function
 * @param {Function} setSearch - search state setter from shopContext
 * @returns {string} feedback message to display
 */
export function executeVoiceCommand(command, navigate, setSearch) {
  switch (command.type) {
    case 'navigate':
      navigate(command.route)
      return `Navigating to ${command.route === '/' ? 'Home' : command.route.replace('/', '')}`

    case 'search':
      setSearch(command.query)
      navigate('/collection')
      return `Searching for "${command.query}"`

    case 'unknown':
    default:
      return `Sorry, I didn't understand "${command.raw}". Try "Open cart" or "Search for shoes".`
  }
}

import quotes from '../data/quotes.json'
import {LS} from '../config/localstorage'
import {includes, shuffle, getName, compare, isLang, isInText, isInSource} from '../utils/helpers'

const defaultLang = localStorage.getItem(LS.lang) || 'ms'

const sortAbc = (a, b) => compare(getName(a, defaultLang), getName(b, defaultLang))

const getBasics = (quotes, lang) => {
  const allAuthors = new Set()
  let minLength = quotes[0][lang].length
  let maxLength = quotes[0][lang].length
  quotes.forEach(q => {
    allAuthors.add(q.author)
    const {length} = q[lang]
    if (!length) return
    if (length < minLength) minLength = length
    if (length > maxLength) maxLength = length
  })
  return {minLength, maxLength, allAuthors}
}

shuffle(quotes)

const {minLength, maxLength, allAuthors} = getBasics(quotes, defaultLang)
const filteredQuotes = quotes.filter(q => isLang(q, defaultLang))
const filteredAuthors = new Set() // lang authors
filteredQuotes.forEach(q => filteredAuthors.add(q.author))

const initialState = {
  allQuotes: quotes,
  filteredQuotes,
  allAuthors: new Set([...allAuthors].sort(sortAbc)),
  filteredAuthors: [...filteredAuthors].sort(sortAbc), // shown in sidebar
  selectedAuthors: new Set(), // selected from sidebar
  admin: localStorage.getItem(LS.admin) === 'true',
  phrase: '',
  authorPhrase: '',
  sourcePhrase: '',
  isFetching: false,
  lang: defaultLang,
  script: localStorage.getItem(LS.script) || 'kir',
  token: localStorage.getItem(LS.token),
  devMode: localStorage.getItem(LS.devMode) === 'true', // to boolean
  translationMode: localStorage.getItem(LS.translationMode) === 'true',
  offlineMode: localStorage.getItem(LS.offlineMode) === 'true',
  minLength,
  maxLength,
  minLimit: minLength,
  maxLimit: maxLength,
}

export const reducer = (state = initialState, action) => {
  const {allQuotes, allAuthors, selectedAuthors, lang, translationMode, phrase, authorPhrase, sourcePhrase, minLimit, maxLimit} = state
  const {quote} = action

  const sortAbc = (a, b) => compare(getName(a, lang), getName(b, lang))

  const filterQ = q =>
    isLang(q, lang, translationMode)
    && isInText(q[lang], phrase)
    && isInSource(q.source, sourcePhrase)
    && (selectedAuthors.size ? selectedAuthors.has(q.author) : true)
    && q[lang].length >= minLimit && q[lang].length <= maxLimit

  switch (action.type) {
    case 'FETCH_QUOTES_REQUEST':
      return {...state, isFetching: true }
    case 'FETCH_QUOTES_SUCCESS': {
      const allAuthors = new Set()
      action.quotes.forEach(q => allAuthors.add(q.author))
      shuffle(action.quotes)
      return {
        ...state,
        isFetching: false,
        allQuotes: action.quotes,
        allAuthors: new Set([...allAuthors].sort(sortAbc)),
      }
    }
    case 'FETCH_QUOTES_FAILURE':
      return {
        ...state,
        isFetching: false,
      }
    case 'INIT': {
      const {minLength, maxLength} = getBasics(allQuotes, lang)
      const filteredQuotes = allQuotes.filter(filterQ)
      const filteredAuthors = new Set()
      filteredQuotes.forEach(q => filteredAuthors.add(q.author))
      return {
        ...state,
        filteredQuotes,
        filteredAuthors: [...filteredAuthors].sort(sortAbc),
        minLength,
        maxLength,
        minLimit: minLimit >= minLength ? minLimit : minLength,
        maxLimit: maxLimit <= maxLength ? maxLimit : maxLength,
      }
    }
    case 'FILTER_QUOTES': {
      return {
        ...state,
        filteredQuotes: allQuotes.filter(filterQ)
      }
    }
    case 'SET_LANGUAGE':
      return {...state, lang: action.lang}
    case 'SET_SCRIPT':
      return {...state, script: action.script }
    case 'SET_TOKEN':
      return {...state, token: action.token }
    case 'SET_ADMIN':
      return {...state, admin: action.admin }
    case 'SET_PHRASE':
      return {...state, phrase: action.phrase }
    case 'SET_AUTHOR_PHRASE':
      return {...state, authorPhrase: action.authorPhrase }
    case 'SET_SOURCE_PHRASE':
      return {...state, sourcePhrase: action.sourcePhrase }
    case 'SET_TRANSLATION_MODE':
      return {...state, translationMode: action.translationMode }
    case 'SET_DEV_MODE':
      return {...state, devMode: action.devMode }
    case 'SET_OFFLINE_MODE':
      return {...state, offlineMode: action.offlineMode }
    case 'SET_MIN_LIMIT':
      return {...state, minLimit: action.minLimit }
    case 'SET_MAX_LIMIT':
      return {...state, maxLimit: action.maxLimit }
    case 'ADD_QUOTE':
      return {
        ...state,
        allQuotes: [...allQuotes, quote],
        filteredQuotes: allQuotes.filter(filterQ),
        allAuthors: allAuthors.add(quote.author)
      }
    case 'UPDATE_QUOTE': {
      const newQuotes = allQuotes.map(q => q._id === quote._id ? quote : q)
      return {
        ...state,
        allQuotes: newQuotes,
        filteredQuotes: newQuotes.filter(filterQ)
      }
    }
    case 'DELETE_QUOTE': {
      const newQuotes = allQuotes.filter(q => q._id !== action._id)
      return {
        ...state,
        allQuotes: newQuotes,
        filteredQuotes: newQuotes.filter(filterQ)
      }
    }
    case 'FILTER_AUTHORS': {
      const filteredAuthors = [...allAuthors]
        .filter(name => includes(name, authorPhrase) || includes(getName(name, lang), authorPhrase))
      return {
        ...state,
        filteredAuthors
      }
    }
    case 'TOGGLE_SELECTED_AUTHORS': {
      const {shouldAdd, value} = action
      const authors = new Set([...selectedAuthors])
      if (shouldAdd) authors.add(value)
      else authors.delete(value)
      return {
        ...state,
        selectedAuthors: authors
      }
    }
    default:
      return state
  }
}

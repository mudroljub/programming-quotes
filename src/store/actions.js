import { useSelector } from 'react-redux'

import translations from '../data/translations'
import {getName} from '../utils/helpers'
import transliterate from '../utils/transliterate'
import {LS} from '../config/localstorage'
import {API, domain} from '../config/api'

const fetchQuotesRequest = () => ({type: 'FETCH_QUOTES_REQUEST'})

const fetchQuotesSuccess = quotes => ({type: 'FETCH_QUOTES_SUCCESS', quotes})
const fetchQuotesFailure = () => ({type: 'FETCH_QUOTES_FAILURE'})

export const init = () => ({type: 'INIT'})

export const setLang = lang => {
  localStorage.setItem(LS.lang, lang)
  return { type: 'SET_LANGUAGE', lang }
}

export const setScript = script => {
  localStorage.setItem(LS.script, script)
  return { type: 'SET_SCRIPT', script }
}

export const setTranslationMode = translationMode => {
  localStorage.setItem(LS.translationMode, translationMode)
  return { type: 'SET_TRANSLATION_MODE', translationMode }
}

export const setDevMode = devMode => {
  localStorage.setItem(LS.devMode, devMode)
  return { type: 'SET_DEV_MODE', devMode }
}

export const setOfflineMode = offlineMode => {
  localStorage.setItem(LS.offlineMode, offlineMode)
  return { type: 'SET_OFFLINE_MODE', offlineMode }
}

export const toggleTranslationMode = () => (dispatch, getState) => {
  const {translationMode} = getState()
  dispatch(setTranslationMode(!translationMode))
  dispatch(init())
}

export const toggleDevMode = () => (dispatch, getState) => {
  const {devMode} = getState()
  dispatch(setDevMode(!devMode))
  dispatch(init())
}

export const setToken = token => ({type: 'SET_TOKEN', token})

export const setAdmin = admin => ({type: 'SET_ADMIN', admin})

export const addQuote = quote => ({type: 'ADD_QUOTE', quote})

export const updateQuote = quote => ({type: 'UPDATE_QUOTE', quote})

export const deleteQuote = _id => ({type: 'DELETE_QUOTE', _id})

export const filterAuthors = () => ({type: 'FILTER_AUTHORS'})

export const filterQuotes = () => ({type: 'FILTER_QUOTES'})

export const toggleSelectedAuthors = (shouldAdd, value) => ({type: 'TOGGLE_SELECTED_AUTHORS', shouldAdd, value})

export const setPhrase = phrase => ({type: 'SET_PHRASE', phrase})

export const setAuthorPhrase = authorPhrase => ({type: 'SET_AUTHOR_PHRASE', authorPhrase})

export const setSourcePhrase = sourcePhrase => ({type: 'SET_SOURCE_PHRASE', sourcePhrase})

export const setMinLimit = minLimit => ({type: 'SET_MIN_LIMIT', minLimit})

export const setMaxLimit = maxLimit => ({type: 'SET_MAX_LIMIT', maxLimit})

/* THUNK */

export const setUser = (token, admin = false) => dispatch => {
  dispatch(setToken(token))
  dispatch(setAdmin(admin))
  localStorage.setItem(LS.token, token)
  localStorage.setItem(LS.admin, admin)
}

export const logout = () => dispatch => {
  dispatch(setToken(''))
  dispatch(setAdmin(false))
  localStorage.setItem(LS.token, '')
  localStorage.setItem(LS.admin, false)
}

export const fetchQuotes = () => async dispatch => {
  dispatch(fetchQuotesRequest(API.read))
  try {
    const response = await fetch(API.read)
    const quotes = await response.json()
    dispatch(fetchQuotesSuccess(quotes))
    dispatch(init())
  } catch (error) {
    dispatch(fetchQuotesFailure())
  }
}

export const checkCountry = () => async dispatch => {

  const setCountryLang = land => {
    if (land === 'Serbia' || land === 'Montenegro' || land === 'Croatia' || land === 'Bosnia and Herzegovina') {
      dispatch(setLang('sr'))
      dispatch(setScript(land === 'Serbia' || land === 'Montenegro' ? 'kir' : 'lat'))
      return
    }
    if (land === 'Poland' || land === 'Czech Republic' || land === 'Slovakia' || land === 'Slovenia') {
      dispatch(setLang('ms'))
      dispatch(setScript('lat'))
      return
    }
    dispatch(setLang('ms'))
    dispatch(setScript('kir'))
  }

  const res = await fetch('https://ipapi.co/json/') // 1,000 requests per day
  const data = await res.json()
  if (data.country_name) setCountryLang(data.country_name)

  // if (!data.country_name) {
  //   const res2 = await fetch('http://www.geoplugin.net/json.gp') // insecure, 120 requests per minute
  //   const data2 = await res2.json()
  //   if (data2.geoplugin_countryName) setCountryLang(data2.geoplugin_countryName)
  // }
}

export const checkUser = (token, service) => dispatch => {
  if (!token) return
  fetch(`${domain}/auth/${service}/${token}`)
    .then(response => response.json())
    .then(response => {
      dispatch(setUser(
        response.user ? token : '',
        response.user ? response.user.admin : false)
      )
    })
}

export const sendQuote = obj => (dispatch, getState) => {
  const {token} = getState()
  const endpoint = obj._id ? API.update : API.create
  const method = obj._id ? 'PUT' : 'POST'
  return fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...obj, token })
  })
    .then(res => res.json())
    .then(res => {
      if (res.message !== 'SUCCESS_SAVED') return
      const action = obj._id ? updateQuote : addQuote
      dispatch(action(res.quote))
      return res.quote._id
    })
}

/* SELECTORS */

export const useTranslate = () => {
  const {lang, script} = useSelector(state => state)
  return key => (translations[lang][key])
    ? transliterate(translations[lang][key], script, lang)
    : key
}

export const useTransliterate = () => {
  const {lang, script} = useSelector(state => state)
  return text => transliterate(text, script, lang)
}

export const useAuthorName = () => {
  const { script, lang } = useSelector(state => state)
  return author => {
    const name = getName(author, lang)
    return transliterate(name, script, lang)
  }
}
import axios from 'axios'
import Buffer  from 'buffer'

// ! not sure this is required but it is a way of decoding the token. Look into it later


export const setToken = (token) => {
  window.localStorage.setItem('local-user-Token', token)
}


export const getToken = () => {
  return window.localStorage.getItem('local-user-Token')
}

export const getPayLoad = () => {
  const token = getToken()
  if (!token) return // If token is undefined end the function
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return // If the length isn't 3, we know it's not a JWT, so it's invalid
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayLoad()
  if (!payload) return // If payload is undefined, return undefined (falsey)
  // If payload is truthy, we want to check the expiry date is in the future
  const currentTime = Math.round(Date.now() / 1000) // Date.now() returns back the unix

  console.log('EXPIRY DATE  ->', payload.exp)
  console.log('CURRENT TIME ->', currentTime)
  console.log('IS EXPIRY DATE IN FUTURE', currentTime < payload.exp)
  return currentTime < payload.exp
}


export const userIsOwner = (item) => {
  const payload = getPayLoad()
  if (!payload) return
  return payload.sub === item.addedBy._id

  
}
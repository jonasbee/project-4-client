import axios from 'axios'
import jwt from 'jsonwebtoken'

import { getToken } from './auth'
const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

function getUserId() {
  const token = getToken()
  const decoded = jwt.verify(token, 'django-insecure-&&vdmcgm9wdoz%(@mbp!-0^8f$$emjy53-jomd)xz_y23vo%=c')
  console.log(decoded)
  const userId = decoded.sub
  console.log(token)
  console.log(userId)
  return userId
}

export function getAllItems() {
  return axios.get(`${baseUrl}/items/`)
}

export function createInventoryItem(itemId, formdata) {
  // const userId = getUserId()
  return axios.post(`${baseUrl}/items/inventory/new/`, formdata, headers())
}

export function getAllInventoryItems() {
  const userId = getUserId()
  return axios.get(`${baseUrl}/items/${userId}/inventory/`, headers())
}

export function deletePersonalisedItem(inventoryItemId) {
  // const userId = getUserId()
  return axios.delete(`${baseUrl}/items/inventory/${inventoryItemId}/`, headers())
}

export function editPersonalisedItem(inventoryItemId, newQuantity) {
  // const userId = getUserId()
  return axios.put(`${baseUrl}/items/inventory/${inventoryItemId}/`, newQuantity, headers())
}

export function login(formdata) {
  return axios.post(`${baseUrl}/auth/login/`, formdata)
}
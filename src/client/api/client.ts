import { baseUrl } from './config'

import axios from 'axios'

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

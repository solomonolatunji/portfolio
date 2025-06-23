import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VUE_APP_STRAPI_BEARER_TOKEN}`,
  },
})

export default api

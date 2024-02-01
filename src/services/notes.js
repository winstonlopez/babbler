import axios from 'axios'
const baseURL = '/api/notes'

let token = null

const setToken = newToken => {
   token = `Bearer ${newToken}`
}

const getAll = async () => {
   const config = {
      headers: { Authorization: token }
   }
   const response = await axios.get(baseURL, config)
   return response.data
}

const create = async newObject => {
   const config = {
      headers: { Authorization: token },
   }

   const response = await axios.post(baseURL, newObject, config)
   console.log(response.data)
   return response.data
}

const update = (id, newObject) => {
   const request = axios.put(`${baseURL}/${id}`, newObject)
   return request.then(response => response.data)
}

const remove = (id) => {

   return axios.delete(`${baseURL}/${id}`)
   
}

export default { getAll, create, update, remove, setToken }
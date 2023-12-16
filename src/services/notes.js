import axios from 'axios'
const baseURL = '/api/notes'

const getAll = ()=> {
   const request = axios.get(baseURL)
   return request.then(response => response.data)
}

const create = (newObject)=> {
   return axios.post(baseURL, newObject)
}

const update = (id, newObject)=> {
   const request = axios.put(`${baseURL}/${id}`, newObject)
   return request.then(response => response.data)
}

const remove = (id) => {

   return axios.delete(`${baseURL}/${id}`)
   
}

export default { getAll, create, update, remove }
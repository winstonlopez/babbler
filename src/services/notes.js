import axios from 'axios'

const baseURL = '/api/notes'  
//base url localhost:3001 will be handled by the backend code, so both the frontend and
//the backend will share the same address, we can declare baseUrl as a relative URL. this means we can leave out the part declaring th server

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

const create = async ({ content }) => {
   const config = {
      headers: { Authorization: token },
   }
   
   const response = await axios.post(baseURL, content, config)
   console.log(response.data)
   return response.data
}

const update = async ({ id, changedNote }) => {

   const response = await axios.put(`${baseURL}/${id}`, changedNote)
   return response.data
}

const remove = async ({ id }) => {
   console.log(id)
   return await axios.delete(`${baseURL}/${id}`)
   
}

export default { getAll, create, update, remove, setToken }
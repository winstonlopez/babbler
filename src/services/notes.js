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
            headers: { Authorization: token }
         }
         
         const response = await axios.post(baseURL, content, config)
         console.log(response.data)
         return response.data
      

   }
   


const like = async ({ id, note }) => {
   const config = {
      headers: { Authorization: token }
   }

   const liker = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).userId

   // console.log(note)

   //check if already liked by user
   const liked = note.likes.find(item => item === liker)
   const disliked = note.dislikes.find(item => item === liker)
   if(disliked){  //remove dislike
      const index = note.dislikes.indexOf(liker)
      note.dislikes.splice(index, 1)
   }
   if(liked){   //remove like
      const index = note.likes.indexOf(liker)
      note.likes.splice(index, 1)
   }else{   //add like
      note.likes = note.likes.concat(liker)
   }

   // console.log(note)

   const response = await axios.put(`${baseURL}/${id}`, note, config )
   return response.data
}

const dislike = async ({ id, note }) => {
   const config = {
      headers: { Authorization: token }
   }

   const liker = JSON.parse(window.localStorage.getItem('loggedNoteappUser')).userId
   
   //check if user liked the post
  const liked = note.likes.find(item => item === liker)
  const disliked = note.dislikes.find(item => item === liker)

  if(liked){   //remove like
   const index = note.likes.indexOf(liker)
   note.likes.splice(index, 1)
  }
  if(disliked){   //remove dislike
   const index = note.dislikes.indexOf(liker)
   note.dislikes.splice(index, 1)
  }else{ //add dislike
   note.dislikes = note.dislikes.concat(liker)
  }

   const response = await axios.put(`${baseURL}/${id}`, note, config)
   return response.data
}

const update = async ({ id, changedNote }) => {

   const response = await axios.put(`${baseURL}/${id}`, changedNote)
   return response.data
}

const remove = async ({ id }) => {

   const config = {
      headers : { Authorization: token }
   }


   return await axios.delete(`${baseURL}/${id}`, config)
   
}

export default { getAll, create, update, remove, setToken, like, dislike }
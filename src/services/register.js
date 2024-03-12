import axios from 'axios'
const baseUrl = '/api/users'

const register = async (credentials) => {

    console.log(credentials)

    const response = await axios.post(baseUrl, credentials)

    return response.data
}

const getUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { register, getUsers }
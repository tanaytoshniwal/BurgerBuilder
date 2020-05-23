import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-aafe6.firebaseio.com/'
})

export default instance
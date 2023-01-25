import axios from 'axios';

// const baseURL = 'http://localhost:4040/api/'

// NODE_ENV = production
const baseURL = process.env.NODE_ENV === 'production' ? 'api/' : 'http://localhost:3030/api/';

export default axios.create({
    baseURL,
})
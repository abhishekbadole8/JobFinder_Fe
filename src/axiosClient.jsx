import axios from "axios"

const client = axios.create({
    // baseURL: `http://localhost:8001`
    baseURL: `https://job-finder-rddz.onrender.com`
})

export default client;
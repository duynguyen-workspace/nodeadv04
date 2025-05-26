const BASE_URL = "http://localhost:8080"

// yarn add axios

import axios from 'axios'

const searchProductApi = async (search_name: any) => {
    const response = await axios.get(`${BASE_URL}/products?name=${search_name}`)

    return response
}

export { searchProductApi }
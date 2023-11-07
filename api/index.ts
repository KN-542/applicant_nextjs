import axios from 'axios'

const APICommonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO スタータスによって分岐
    return error
  },
)

export { APICommonHeader }

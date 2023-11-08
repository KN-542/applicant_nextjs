import axios from 'axios'

const APICommonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO 画面遷移
    return error
  },
)

export { APICommonHeader }

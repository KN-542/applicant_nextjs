import axios from 'axios'

const APICommonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // これによりCookieを含める
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO 画面遷移
    console.log(error)
    return error
  },
)

export { APICommonHeader }

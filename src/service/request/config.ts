// const BASE_URL = 'http://123.207.32.32:8000'
let BASE_URL = ''
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://codewhy.org/prod'
} else {
  BASE_URL = 'http://codewhy.org/test'
}

export { BASE_URL, TIME_OUT }

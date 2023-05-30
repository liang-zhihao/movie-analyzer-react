import axios from 'axios'
import { apiPrefix } from '../utils/config'
const refresh = async (refreshToken) => {
    return axios.post(apiPrefix + '/user/refresh', refreshToken)
}
export default refresh;
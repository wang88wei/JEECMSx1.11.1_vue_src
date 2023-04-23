import axios from '../axios'
import demoUrls from '../urls/demo.js'

export default {
  getAllUserList (data) {
    return axios.get(demoUrls.getAllUser, data)
  },
  insertUser (data) {
    return axios.post(demoUrls.insertUser, data)
  },
  updateUser (data) {
    return axios._put(demoUrls.updateUser, data)
  },
  deleteUser (data) {
    return axios._delete(demoUrls.deleteUser, data)
  }
}

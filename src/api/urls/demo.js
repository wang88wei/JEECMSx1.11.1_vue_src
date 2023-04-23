/* system-cms-prefix start */
const prefix = ''
/* system-cms-prefix change const prefix = '/cmsadmin' system-cms-prefix change */
/* system-cms-prefix end */
export default {
  // 会员模型字段
  getAllUser: `${prefix}/user/getAllUserList`,
  insertUser: `${prefix}/user/insertUser`,
  updateUser: `${prefix}/user/updateUser`,
  deleteUser: `${prefix}/user/deleteUser`
}

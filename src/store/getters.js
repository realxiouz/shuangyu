const getters = {
  token: state => state.user.token,
  userId: state => state.staff.loginInfo.userId,
  nickName: state => state.staff.loginInfo.nickName,
  fullName: state => state.staff.loginInfo.fullName,
  gender: state => state.staff.loginInfo.gender,
  birthDate: state => state.staff.loginInfo.birthDate,
  headImgUrl: state => state.staff.loginInfo.headImgUrl,
  firms: state => state.staff.loginInfo.firms,
  staffId: state => state.staff.loginInfo.staffId,
  firm: state => state.staff.loginInfo.firm,
  depts: state => state.staff.loginInfo.depts,
  menus: state => state.staff.loginInfo.menus,
  timestamp: state => state.staff.timestamp
}
export default getters

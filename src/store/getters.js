const getters = {
  token: state => state.user.token,
  userId: state => state.staff.loginInfo ? state.staff.loginInfo.userId : "",
  nickName: state => state.staff.loginInfo ? state.staff.loginInfo.nickName : "",
  fullName: state => state.staff.loginInfo ? state.staff.loginInfo.fullName : "",
  gender: state => state.staff.loginInfo ? state.staff.loginInfo.gender : "",
  birthDate: state => state.staff.loginInfo ? state.staff.loginInfo.birthDate : "",
  headImgUrl: state => state.staff.loginInfo ? state.staff.loginInfo.headImgUrl : "",
  firms: state => state.staff.loginInfo ? state.staff.loginInfo.firms : [],
  staffId: state => state.staff.loginInfo ? state.staff.loginInfo.staffId : "",
  firm: state => state.staff.loginInfo ? state.staff.loginInfo.firm : {},
  depts: state => state.staff.loginInfo ? state.staff.loginInfo.depts : [],
  menus: state => state.staff.loginInfo ? state.staff.loginInfo.menus : []
}
export default getters

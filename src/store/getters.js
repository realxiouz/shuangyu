function menuFilter(menu) {
  if (menu.children && menu.children.length > 0) {
    let _children = menu.children.filter(menuFilter);
    if (_children && _children.length > 0) {
      menu.hasChildren = true;
    } else {
      menu.hasChildren = false;
    }
    menu.children = _children;
  }
  if (menu.tags && menu.tags.length > 0) {
    return menu.tags.indexOf("NAV") > -1;
  } else {
    return false;
  }
}

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
  menus: state => {
    if (state.staff.loginInfo) {
      if (state.staff.loginInfo.menus && state.staff.loginInfo.menus.length > 0) {
        return state.staff.loginInfo.menus
          .sort((i, j) => i.sort - j.sort)
          .filter(menuFilter);
      }
    }
    return [];
  }
}
export default getters

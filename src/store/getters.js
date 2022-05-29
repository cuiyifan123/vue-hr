const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username
}
export default getters

const hoc = Com => props => {
  return Com(props)
}
hoc((props) => {
  console.log(props)
})(1)

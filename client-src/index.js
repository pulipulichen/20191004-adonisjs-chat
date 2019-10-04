let $ = require('jquery')
const axios = require('axios');

//$('body').append('<h1>AAA</h1>')

$('#addUser').click(async () => {
  let unixMS = (new Date()).getTime()
  await axios.get('http://127.0.0.1:3333/user/create', {
    params: {
      username: 'Pudding' + unixMS,
      email: 'pudding' + unixMS + '@pulipuli.info',
      password: unixMS + ''
    }
  })
  console.log('addUser')
})

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

let list = $('#usersList')

$('#loadUsers').click(async () => {
  let users = await axios.get('http://127.0.0.1:3333/user/all')
  users = users.data
  //console.log(users)
  list.empty()
  users.map(user => {
    list.append(`<div>${user.username}</div>`)
  })
})
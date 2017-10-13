const connect = require('connect');

const app = connect()
app.use(connect.logger())
app.listen(3000)

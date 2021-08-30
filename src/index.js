const express = require('express')
require("./db/mongoose")
/*
const User = require('./models/user')
const Task = require('./models/task')
*/
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task.js')

const app = express()

const port = process.env.PORT 


// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port, ()=>{
    console.log('Server is up on port: ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')
const { bool } = require('sharp')

const main = async () => {
  //const task = await Task.findById('60e0c18cd2c306334c2e0d93')
  //await task.populate('owner').execPopulate()
  //console.log(task.owner)
/*
  const user = await User.findById('60e0bf28f0fda11074ef6721')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
*/
  
}

main()






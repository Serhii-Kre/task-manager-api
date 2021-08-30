const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})





/*

const me = new User({name: 'Serg', age: 78, email: 'aa@aa.aa', password: '4df'})

me.save().then(() => {
    console.log(me)
}).catch((error)=> {
  console.log(error)
})

*/
/*
const task = new Task( {
  description: 'leart the library',
  completed: false
}) 

task.save().then((t)=> {
  console.log(t)
}).catch((error)=> {
  console.log(error)
})
*/

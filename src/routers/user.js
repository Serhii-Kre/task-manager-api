const express = require('express')
const router = express.Router()
const sharp = require('sharp')
const multer = require('multer')
const auth = require('../middleware/auth')
const User = require('../models/user')

router.post('/users', async (req,res)=> {
    const user = new User(req.body) 
  
    try {
      await user.save() 
      
      const token = await user.generateAuthToken()

      res.status(201).send({user,token})
    } catch (error) {
      res.status(400).send(error)
    }
  
    // user.save().then(()=> {
    //  res.send(user)
    // }).catch(()=>{
    //  res.status(400).send(error)
    // })
  
  })
  
  router.post('/users/login', async(req,res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)

     const token = await user.generateAuthToken()

      res.send({user, token}) 
      res.status(200).send()
    } catch {
      res.status(400).send()
    }
  })

  router.post('/users/logout', auth, async(req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
  })

  router.post('/users/logoutAll', auth, async(req,res) => {
    try {
      req.user.tokens = []
      await req.user.save()
  
      res.send()
    } catch (error) {
      res.status(500).send()
    }
    })


  router.get('/users/me', auth, async (req,res)=> {
  
    res.send(req.user)
    
   
  })
  
  
  
  // update = patch
  
 // router.patch('/users/:id', async (req, res) => {
  router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
  
  if(!isValidOperation) {
    return res.status(400).send("error: invalid updates")
  }
  
    try {

   

     // const user = await User.findById(req.params.id)

     
      
      updates.forEach((update)=> {
        req.user[update] = req.body[update]
      })
      await req.user.save()
 
   //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
  
     
      return res.send(req.user)
    } catch (error) {
      res.status(404).send(error)
    }
  })
  
  router.delete('/users/me', auth, async (req, res) => {
    try {
      // const user = await User.findByIdAndDelete(req.user._id)
  
      // if(!user) {
      //   return res.status(404).send()
      // }
      await req.user.remove()
      res.send(req.user)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  const upload = multer({
   /*  dest: 'avatars',*/
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {

      if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error('must be an image'))
      }

      cb(undefined, true)


      // cb(new Error('must be a PDF'))
      // cb(undefined, true)
      // cb(undefined, false)
    }
  })


 

  router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

  
    
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    
    req.user.avatar = buffer  
    
    
    await req.user.save()
    res.send()
  },(error, req, res, next)=>{
    res.status(400).send({error:error.message})
  })


  router.delete('/users/me/avatar',auth,async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()

  })


  router.get('/users/:id/avatar', async (req, res) => {
   
    try {
     const user = await User.findById(req.params.id)

   

      if(!user || !user.avatar) {
          throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
   
 
    } catch {
      res.status(404).send()
    }
  })

module.exports = router
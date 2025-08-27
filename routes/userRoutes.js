const express = require('express')
const {registerUser, loginUser,getUsers, userDelete,deleteMyAccount,updateMyaccount} = require('../controllers/userController')
const {protect,admin } = require('../middleware/authMiddleware')

const userRouter = express.Router()

userRouter.get('/',protect, getUsers);
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.delete('/me', protect, deleteMyAccount)
userRouter.delete('/:id', protect, admin, userDelete)
userRouter.put('/me',protect,updateMyaccount)



module.exports = userRouter
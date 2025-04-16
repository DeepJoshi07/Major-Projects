import express from 'express'
import {checkAuth} from '../middleware/checkAuth.js'
import {createPost, getPost,like,comment} from '../controllers/post.controllers.js'
import upload from "../middleware/multer.js"

const postRouter = express.Router()

postRouter.post('/addpost',checkAuth,upload.single('image'),createPost)
postRouter.get('/getpost',checkAuth,getPost)
postRouter.post('/like/:id',checkAuth,like)
postRouter.post('/comment/:id',checkAuth,comment)

export default postRouter;
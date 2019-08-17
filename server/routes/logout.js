import express from 'express'

let router = express.Router()


router.post('/', (req, res) => {
  req.session.destroy()
  res.json({status: 1})
})

export default router

const {Router} = require('express')
const router = Router()
router.get('/login',async(req,res)=>{
    res.render('auth/login',{
        title: 'Tizimga kirish',

    })
})
router.post('/login',async(req,res)=>{
    req.session.isAuthed = true
    res.redirect('/')
})
module.exports = router
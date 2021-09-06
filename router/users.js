const {Router} = require('express')
const User = require('../modeles/user')
const router = Router()
router.get('/',async(req,res)=>{
    const users = await User.find().lean()
    res.render('users',{
        title: 'Foydalanuvchilar',
        isUsers:true,
        users
    })
})
router.get('/new',(req,res)=>{
    res.render('newuser',{
        title: 'Yangi foydalanuvchi'
    })
})
router.post('/', async (req,res)=>{
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        avatar: req.body.avatar
    })
    user.save()
    res.redirect('/users')
})
module.exports = router
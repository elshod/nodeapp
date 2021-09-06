const {Router} = require('express')
const router = Router() 
router.get('/',(req,res)=>{
    res.render('index',{
        title: 'Bosh sahifa',
        isHome: true
    })
})
router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Biz haqimizda',
        isAbout: true
    })
})
module.exports = router
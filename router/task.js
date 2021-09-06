const {Router} = require('express')
const Task = require('../modeles/task')
const User = require('../modeles/user')
const router = Router()
router.get('/',async(req,res)=>{
    const tasks = await Task.find().lean()
    .populate('userId','name email')
    .select('title status userId')
    res.render('tasks',{
        title: 'Topshiriqlar ro`yhati',
        isTasks:true, tasks
    })
})


router.get('/new',async(req,res)=>{
    const users = await User.find().lean()
    res.render('newtask',{ 
        title: 'Yangi topshiriq',users
    })
})


router.post('/comment/:id',async(req,res)=>{
    const task = await Task.findById(req.params.id).lean()
    const comment = { userId: req.body.userId, 
        text: req.body.text,
        createdAt: Date.now() }
    task.comments.comment.push(comment)
    await Task.findByIdAndUpdate(req.params.id,task)
    res.redirect(`/tasks/${req.params.id}`)
})

router.get

router.get('/delete/:id',async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.redirect('/tasks')
})

router.get('/:id',async(req,res)=>{
    const task = await Task.findById(req.params.id).lean().populate('userId','name').populate('comments.comment.userId','name')
    const users = await User.find().select('_id name email').lean()
    res.render('viewtask',{
        title: `${task.title} | ${task.userId.name}`,
        task, users
    })
})

router.get('/:taskid/delcomment/:commentid',async(req,res)=>{
    const task = await Task.findById(req.params.taskid)
    const comments = task.comments.comment 
    const index = comments.findIndex(c => c.id == req.params.commentid)
    comments.splice(index,1)
    task.comments.comment = comments
    await Task.findByIdAndUpdate(req.params.taskid,task)
    res.redirect(`/tasks/${req.params.taskid}`)
})

router.post('/', async(req,res)=>{
    const task = await new Task({
        title: req.body.title, 
        text:  req.body.text,
        status: 'Pending', userId: req.body.userId
    })
    task.save()
    res.redirect('/tasks')
})
module.exports = router
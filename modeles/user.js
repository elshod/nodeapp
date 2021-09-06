const {Schema, model} = require('mongoose')
const user = new Schema({
    name: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true 
    },
    skills: { 
        type: Array, 
        required: true 
    },
    avatar: { 
        type: String, 
    }
})
module.exports = model('User',user)
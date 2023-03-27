import express from 'express';
import fileService from '../file_service_modules/file-service.js';
import authSession from '../session/session.create.js';
import jwt from 'jsonwebtoken'



const authRouter = express.Router()


// stateful - session based authentication and authorization
authRouter.post('/login', authSession, async(req, res) => {

    const users = await fileService.readFile('./db/users.json')
    const allUsers = JSON.parse(users)
    console.log(allUsers)
    const fullname = req.body.fullname;
    const username = req.body.username
    console.log(req.body)
    const role = req.body.role
    const userFound = allUsers.find(user => user.fullname === fullname && user.username === username)
    if(!userFound) {
        res.status(403).send('No such urer, sorry you can not add blogs')
    } else {  
        req.session.user = {
            username: userFound.username,
            isLoggedIn: true,
            logInAs: role
        }
        res.status(200).send('We find the user, you are loged in.')
    }
})
authRouter.post('/logout', authSession, (req, res)=>{

    const session = req.session
    session.destroy()
    res.send('Log out sucessfully')
})

// stateful - cookie based authorization and authentication
// authRouter.post('/login',async (req, res) => {
//     const users = await fileService.readFile('./db/users.json')
//     const allUsers = JSON.parse(users)
//     console.log(allUsers)

//     const username = req.body.username
//     const fullname = req.body.fullname

//     const userFound = allUsers.find(user => user.username === username && user.fullname === fullname)
//     console.log('We found the user',userFound)

//     if(!userFound) {
//         res.status(404).send('You are not logged in')
//     } else {
//         res.cookie('user', {username: username, isLoggedIn: true})
//         res.send('You are logged in')
//     }

// })

// authRouter.post('/logout', (req, res)=>{
//     res.clearCookie('user')
//     res.send('Log out sucessfully')
// })


// Stateless - token based authorisation and authentication
// authRouter.post('/login', async (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     const users = await fileService.readFile('./db/users.json')
//     const allUsers = JSON.parse(users)

//     const userFound = allUsers.find(user => user.username === username && user.password === password)
//     console.log(userFound)
//     if(!userFound){
//         res.status(404).send({message: "User not found"})
//     }

//    const accesToken = jwt.sign({
//         username: userFound.username,
//         fullname: userFound.fullname
//     },
//     "login_access_token",
//     {expiresIn: "30s"}
//     )

//     const refreshToken = jwt.sign({
//         username: userFound.username,
//         fullname: userFound.fullname
//     },
//     "login_refresh_token")

//     res.status(200).send({accesToken: accesToken, refreshToken: refreshToken})

// })



export default authRouter
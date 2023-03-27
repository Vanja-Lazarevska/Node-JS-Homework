import sessionExpress from 'express-session'

const authSession = sessionExpress({
    secret: "auth_session_user",
    name: "verify_user",
    cookie: {
        maxAge: 5 * 60 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true
})

export default authSession


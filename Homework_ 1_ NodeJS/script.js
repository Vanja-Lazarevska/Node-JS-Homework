// Using package (colors)
// Login functionality with the usage of the package colors
// Create a function that accepts two params: username & password
// If user exists in users array print the message : "User is logged in" in green text
// If not: "User not found" in red text and yellow background */

let colors = require('colors')
console.log('Connected')

let users = [ 
    {role: "admin", fullname: "John Doe", username: "qwerty", password: "123qwe"}, 
    {role: "client", fullName: "Bob Bobski", username: "asdasd", password: "zxczxc"},
    {role: "intern", fullName: "Sem Smith", username: "semy123", password: "eweewewe"},
    {role: "developer", fullName: "Ana Nelson", username: "anz333", password: "987654321"}
];

let loginFunc = (userN, pw, array) => {
    let found = array.find(element => element.username === userN && element.password == pw )
        if(found){
            console.log('User is logged in'.italic.green)
            console.log(`Users pw is ${pw}`.hidden)
        }
        else{
            console.log('User not found'.trap.red)
        }

}


loginFunc('jim', '432', users)
loginFunc('semy123', 'eweewewe', users)
loginFunc('anz333', '987654321', users)
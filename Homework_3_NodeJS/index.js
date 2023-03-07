import EventEmitter from "events";
import { v4 as uuidv4 } from 'uuid';
import file_system from "./file_system.js"

const eventEmitter = new EventEmitter()


const addToStudentsArray = (path, data) => {
    let content = file_system.readFromFile(path)
    // const elementOFarray = content.push(data) ----> vrakja 3 kako number 
    // console.log('The element of array',elementOFarray)
    content.push(data)
    file_system.writeToFile(path, JSON.stringify(content, null, 2))  
  }

const loginFunction = (studentFullName, studentEmail, studentPassword) => {
    const student = {
        fullName: studentFullName,
        email: studentEmail,
        pw: studentPassword,
        id: uuidv4()
    }
    eventEmitter.on('login', () =>{
        console.log(`Hi there ${student.fullName}`)
        file_system.appendToFile('./greeting_log.txt', student.fullName)
    })
    addToStudentsArray('students.json', student)
    return student
}

loginFunction('Tereza Nelson', 'tery_nel@yahoo.com', '123456')
loginFunction('Pether Smith', 'smith01@yahoo.com', 'mynewpw')
loginFunction('Ana Wilson', 'annch@yahoo.com', 'mynameisann')

eventEmitter.emit('login')

//Create an event that will greet all students when they register to our app!
//Create a function that accepts parameters: studentFullname, studentEmail, studentPassword;
//The function should create a new student object (PS: Feel free to add id property to the student using the uuid library from class);
//Whenever the student object is created emit the event that will greet the student;
//BONUS:
//The previously created event, that greets the student, should aswell save the student full name in separate file named greeting_log.txt.
//In a separate file called students.json, using the file system module, save the newly created student.


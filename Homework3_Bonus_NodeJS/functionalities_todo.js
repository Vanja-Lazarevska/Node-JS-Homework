import { addTodo, readTodos, writeToFile } from "./file-service.js";


const deleteById = (todoId) => {
   const content = readTodos('./db/todos.json')
    const filtered = content.filter(objectOfContent => objectOfContent.id !== todoId)
    writeToFile('./db/todos.json',JSON.stringify(filtered, null, 2))
}

const readById = (todoId) => {
    const content = readTodos('./db/todos.json')
    const oneObj = content.find(element => element.id === todoId)
    console.log(oneObj)
}


const changeDone = (todoName) => {
    const content = readTodos('./db/todos.json')
    const object = content.find(element => element.name === todoName)
    if(object.done === true){
        object.done = false
    } else {
        object.done = true
    }

    console.log(object)
    console.log(content)

    writeToFile('./db/todos.json',JSON.stringify(content, null, 2))
    

}
deleteById('2')
readById('1')
changeDone('Watch anime')



// TODO Exercise extra Bonus:
// Create functionallity to delete todo by given id;
// Create functionallity to read a todo by given id;
// Create functionallity to change the finish property of the todo from false to true;
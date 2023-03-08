import fs from "fs"
import {v4 as uuidv4} from "uuid"

export const writeToFile = (path, data) => {
    fs.writeFileSync(path, data)
}

const appendToFile = (path, data) => {
    fs.appendFileSync(path, data)
}

const readFromFile = (path) => {
    const content = fs.readFileSync(path, {encoding: "utf-8"})
    return content
}

export const readTodos = (path) => {
    const todos = readFromFile(path)
    const parsedTodos = JSON.parse(todos)
    return parsedTodos
}

export const addTodo = (path, todoName, isToDoDone) => {

    const todo = {
        id: uuidv4(),
        name: todoName,
        done: isToDoDone
    }

    const allTodos = readTodos(path)
    allTodos.push(todo)

    writeToFile(path, JSON.stringify(allTodos, null, 2))
}

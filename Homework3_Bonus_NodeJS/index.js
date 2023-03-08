import { addTodo, readTodos, writeToFile } from "./file-service.js";

readTodos("./db/todos.json")
addTodo('./db/todos.json', "Study NodeJs", false)
addTodo("./db/todos.json", "Go to the gym", false)
addTodo("./db/todos.json", "Clean the room", true)
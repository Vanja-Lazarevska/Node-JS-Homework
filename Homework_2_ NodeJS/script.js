// 1.Initialize a new npm project and create an index.js file. 2.Using the fs module create a new file called homework.txt 3.Create a path to the file using the path module 4.Inside the file write the following "Homework 02 in Basic Node" 5.Append to the file the following " FINISHED!" 6.Read the file contents and print them out in the console.

const fs = require("fs");
const path = require("path")

const fileFunction = (fileSystem, pathSystem) => {
    fileSystem.writeFileSync('homework.txt', 'Homework 02 in Basic Node');
    const pathForFile = pathSystem.join(__dirname, "homework.txt")
    fileSystem.appendFileSync('homework.txt', '\nFINISHED')
    const content = fileSystem.readFileSync(pathForFile, "utf-8")
    console.log(content)
}


fileFunction(fs, path)

const newFunction = (fileSystem, pathSystem, fileName, fileText) => {
    fileSystem.writeFileSync(fileName, fileText);
    const pathForFile = pathSystem.join(__dirname, fileName)
    fileSystem.appendFileSync(fileName, '\nWith an exported function')
    const content = fileSystem.readFileSync(pathForFile, "utf-8")
    console.log(content)

}
module.exports = {
    newFunction, 
    fs 
}

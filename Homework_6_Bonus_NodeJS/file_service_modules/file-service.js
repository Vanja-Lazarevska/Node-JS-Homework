import fsPromises from 'fs/promises'

const readFile = async (path) => {
    const content = await fsPromises.readFile(path, {encoding: 'utf-8'})
    return content
}   

const writeFile = async (path, data) => {
    await fsPromises.writeFile(path, data)
}

export default {
    readFile,
    writeFile
}
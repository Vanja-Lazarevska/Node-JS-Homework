import http from "http"

const server = http.createServer((request, response) =>{

  const url = request.url
  
  if(url === '/') {
    response.setHeader('content-type', 'text/html')
    response.write(`<h1>SEAVUS Academy</h1>
    <p>Welcome to SEDC Academy page, here you can find information about our students</p>`)
    response.end()
  }

  if(url === '/student') {
    response.setHeader('content-type', 'text/html')
    response.write(`<h1>Information abotu SEDC student</h1>
    <p>Student name: Vanja</p>
    <p>Student lastname: Lazarevska</p>
    <p>Academy: Code Academy</p>
    <p>Subject: NodeJS</p>`)
    response.end()
  }

})

server.listen(3000, () =>{
    console.log('The server is ready to give information')
})



// Exercise #1
// Create server using HTTP module; -When the default url is hit return HTML content to the user, the content of 
// your choice. -When the url /student is hit, return HTML with the informations: -Student name: "your name"; 
// Student lastname: "your lastname"; -Academy: "the academy you are at"; -Subject: "the current subject we are 
// learning";
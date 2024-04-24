<h1 align="center">🌐 JobSewa Job Portal Website - MERN Stack</h1>
<p align="center">MongoDB, Expressjs, React/Redux, Nodejs</p>

<h2> Live Demo: <a>https://jobsewa-jobportal.onrender.com</a></h2>

## Clone or Download
```terminal
$ git clone https://github.com/Niiischal/jobsewa-jobportal
$ npm i
```

## Project Structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://www.mongodb.com/)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ npm i    // npm install packages
$ npm start        // run the client server

`
```
## Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd server
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> src/.env
```

### Start

```terminal
$ node server/index .js      // start the server
```



Email Me: nischal.khatiwada745@gmail.com
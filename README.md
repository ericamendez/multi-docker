## A web application that connects React clientside with a Node.js/Express backend that will take user input store the input into Postgres. It will also cache the input and calculate an output that will be stored in Redis.
The purpose of this app is to learn how to build and "Dockerize" a multi-container application.

### Connecting multiple containers:
- Client (React)
- Api/Server (Express)
- Postgres (Database)
- Redis (Caching)
- Worker (Express, where calculation will be done and added cached)
- Nginx (Routing server)

### Routing incoming request with Nginx server:
- When request includes `/api` this is going to get routed to the Express Server (ex. `/api/values/all`) port 5000
- `/` will get routed to the React server (ex. `/index.html` or `/main.js`) port 3000.
- Why not use port (react port 4000, express port 3000)? We don't want to juggle these different ports in a production environment. Also the port can easily change so it is safer to veriy the token at the beginning of the route path `/api` than at the end such as `/api/values/all:3000` and let Nginx route for us.
- Eventually `/api` will be cut off by Nginx so that when it goes into Nginx it will be `/api/values/all` and when it goes out it will be `/values/all`. So Express server only needs to call for `/values/all`
- File `default.conf` is where we will add configuration for set of routing rules to Nginx. This file will be added to the Nginx image. 

### Flow of how this multi container setup will get deployed:
1. Push code to Github
2. Travis automatically pulls repo
3. Travis builds a test image, tests code
4. Travis builds prod images
5. Travis pushes built prod images to Docker Hub
6. Travis pushes project to AWS EB
7. EB pulls images from Docker Hub and deploys

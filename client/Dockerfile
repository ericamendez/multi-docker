# build phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#  run phase
# /app/build <- will have all the things we care about which is just the static files, we will not copy over anything else from build phase
FROM nginx
#  Just for production. EBS will look for this opt ion and whaterver port you specify EBS will map automatically
EXPOSE 3000
# we want to copy something from a different phase
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build usr/share/nginx/html
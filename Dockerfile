#Sets node version to be used
FROM node:18.17.1

#Sets the working directory
WORKDIR /app

#Copies all needed files from the current docker file location
COPY . /app


#Install dependencies
RUN npm install

#Expose port 8080 for docker to use
EXPOSE 8080

#Starts server
CMD [ "node", "server.js"]

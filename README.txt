Web Server with Docker

This repository contains a web server that can be easily deployed using Docker. The server provides various API endpoints for retrieving information about flights and cities. Follow the steps below to run the server and access its features.

Prerequisites
Make sure you have Docker installed on your machine.

In order to run the server follow the following steps:
  - open a cmd window and move to where the dockerfile is located
  - in cmd run the command:  docker run -p 8080:8080 my-node-app
  - The server now runs on port 8080.

  -To stop the Docker from running: in cmd - docker ps
  -Copy the docker image name or id
  -Then run the command: docker stop CONTAINER_ID_OR_NAME

To access server: http://localhost:8080/
The web-server supports the following requests:

(1) Return number of total flights (Inbound / outbound)
request by: http://localhost:8080/api/data/allFlights

(2) Return number of total outbound flights 
request by: http://localhost:8080/api/data/allOutBound

(3) Return number of total inbound flights 
request by: http://localhost:8080/api/data/allInBound

(4) Return number of total flights from a specific country (Inbound / outbound)
request by: http://localhost:8080/api/data/allFlights/:country
examples: 
http://localhost:8080/api/data/allFlights/:Germany - returns the number of flights to and from germany.
http://localhost:8080/api/data/allFlights/:united_states - returns the number of flights to and from united_states.

(5) Return number of total inbound flights from a specific country
request by: http://localhost:8080/api/data/allInBound/:country
examples: 
http://localhost:8080/api/data/allInBound/:Germany - returns the number of inbound flights to and from germany.

(6) Return number of total outbound flights from a specific country 
request by: http://localhost:8080/api/data/allOutBound/:country
examples: 
http://localhost:8080/api/data/allInBound/:Germany - returns the number of outbound flights to and from germany.

(7) Return number of delayed flights 
request by: http://localhost:8080/api/data/allDelayed

(8) Return the most popular city 
request by: http://localhost:8080/api/data/mostPopular

(9) Return a pair of flights for a quick getaway
request by: http://localhost:8080/api/data/quickGetaway





watchdock
=========

# Docker Monitoring and Management Client

watchdock is a Docker monitoring web application. The application is self contained, no additional dependencies, services (except docker :-) or servers are needed.

The docker demon needs to be exposed as IP service with activated CORS:
`-H tcp://0.0.0.0:5555 -api-enable-cors`

Launch index.html from a browser and set the docker host and port.
## Infra

-   The web application will run within a Docker container on a VPS
-   VPS is running on Ubuntu Server
-   Cloudflare reverse proxy for DDOS prevention
-   NGINX reverse proxy to allow multiple seperate applications to be run on the VPS within different Docker containers
-   NGINX is run within a docker container with an updated config for the reverse proxy

### NGINX

-   [Reverse proxy configuration](https://anaselfatihi.medium.com/how-to-set-up-a-reverse-proxy-for-multiple-docker-containers-using-nginx-8c7fb631c607)

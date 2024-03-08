## Docker

-   In production, this application will run in a Docker container on a virtual machine

### Why Use Docker

-   I want to get experience using NextJS within a Docker container rather than running it serverless
-   I want to understand the performance implications of running NextJS in a Docker container
-   I want to reduce reliance on Vercel from their hosting services
-   I want to minimise costs running multiple applications that get low traffic on a VPS within Docker

### Docker Implementation

### Environment variables

-   Setting environment variables can be tricky (code snippet below from the docker-compose.yaml file)
-   Check env vars of a container - docker exec <container-id> env

```
services:
  nodeapp4:
    image: jarrodlilkendey/168-hours-nextjs-docker:latest
    networks:
      - mynetwork
    env_file:
      - path: ./168hours/.env.production.local
        required: true
```

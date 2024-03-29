# DCAD-Q-A

# Backend:

    John Wall
    Michael
    Jineth

# Frontend:

    Ruisheng
    Andrew
    Yunying
    Sam

# Running the application

- If you are not very familiar with the tech stack and you don't want to install and configure development tools it is recommended to use Docker as it works out of the box. For further details please refer to User Manual.

- Running using Docker (Recommended)

  - to install: https://docs.docker.com/get-docker/
  - make sure you are in the root of the project in the command line and have docker desktop open in the background
  - if you have Docker installed then it is simply 2 commands
    - `docker build . -t <image_name>`
    - this might take a while
    - `docker run -p 5173:8080 -d <image_name>`
    - the application will then be available on this address: localhost:5173

- Running using Golang and Node
  - to install: https://go.dev/doc/install
    https://nodejs.org/en/download
  - Assuming you have Golang, NodeJS and NPM installed
  - Assuming you are in root
  - Frontend
    - `cd frontend`
    - `npm run dev`
  - Backend
    - `cd backend`
    - `go run main.go`

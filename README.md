# loan-calculator

##Run project locally
API service running on port 3001. This port can be changed by setting the env variable "PORT".

For now two GET endpoints are defined:

http://localhost:3001/monthlyPayment

http://localhost:3001/totalRent

When the nodejs package manager `npm`is not installed on your machine, please install with this link.
https://nodejs.org/en/download/

To build the code and prepare it to run:
`npm install`


To start the service:
`npm start`


To run the tests:
`npm test`


To run the linter:
`npm run lint`

## Git
Fork this repo and follow powerpoint actions.

## CI/CD exercise
In this chapter we guide you through the steps of a complete pipeline. 

### Adapt pipeline config
The first step is to fix the pipeline with the goal to trigger a build on each push to the master branch.

### Checkout your repo
In order to access your project in the pipeline, you need to checkout your repo in the pipeline environment. Verify with the `ls` command step.
https://github.com/actions/checkout

### Prepare runtime environment of the pipeline for build.
As the server is written in nodejs, we would like to have a pipeline where npm is available.
https://github.com/actions/setup-node

### Build / Install project dependencies.
To be able to run the project, we need to install all required dependencies in the pipeline env.

### Run code validations
After the install step, we can run our first validation on the code. 
In our case we can run the npm unit tests and check the code style with a linter.

### Docker build locally
After first validations it is time to build our docker image. Following these steps
1) Install docker on your machine https://docs.docker.com/desktop/windows/install/
2) Create a file named `Dockerfile` in the main folder
3) Input following lines.
```dockerfile
#From defines the base image where your image depends on
FROM node:16.6.2-slim
#Define a working directory in the docker container where you can find the code later on.
WORKDIR /usr/src/app
#Expose port to access server. 
EXPOSE 8080
#COPY all files into the image, this way all node-modules are available and you can immediately run the code
COPY . .
#This command will run when the docker image is boots. And start the server.
CMD ["npm","run", "deploy"]
```
4) Build docker file and tag a name locally `docker build . -t "my-first-container:v0.0.1"`
5) Checkout docker image exists `docker images`
6) Run docker image locally `docker run my-first-container:v0.0.1`
7) Verify docker is server is running `docker ps`
8) Call endpoints described above.

### Docker build.
Once the local image is verified, we can execute the steps in the pipeline.

### Docker push locally
Time to store and share our image on docker hub. 
1) Create dockerhub account https://hub.docker.com/
2) Tag image with the correct dockerhub repo and a test version `docker tag my-first-container:v0.0.1 dockerhubaccount/reponame:testversion`
3) login to dockerhub `docker login -u dockerhubaccount -p password`

**Warning:** This password is a credential and should not be shared with anyone.

4) Push your image `docker push dockerhubaccount/reponame:testversion`
5) Verify your image in dockerhub

### Docker push
After local verification, we can move to our pipeline env and automate it. As we need a secret in our pipeline, we will touch github secrets briefly.
1) Browse to your github repo -> settings -> secrets -> actions https://docs.github.com/en/actions/security-guides/encrypted-secrets
2) Add your Dockerhub secret in the repository secrets
3) To access this secret in the pipeline use `${{ secrets.DOCKER_HUB_TOKEN }}`
4) Login to docker hub
5) Push image to your repo with a static tag.
6) Improve flow by implementing an automatic tag increment on each push

### Build configuration
Once we have our docker container ready to be deployed, we need to package the config on how to deploy this container.
In the repo you can find a Helm chart https://helm.sh/. 
Helm is a package manager for kubernetes. 
1) Install helm on your machine
2) Generate kubernetes yaml files from template
3) Play with the values.yaml file.
4) Go crazy and set up your first aks cluster in azure and deploy the charts. 



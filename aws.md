# Setup aws mongodb

Spin up EC2 instance

- choose Ubuntu 18.04
- create a new key pair
- download the key pair
- launch the instance and open the terminal
- remember security tab and some launch wizard -> inbound rules -> add rule -> CUSTOM TCP -> 4000 -> anywhere
- and same for 3000

sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo docker run hello-world
docker ps
sudo chmod 666 /var/run/docker.sock
sudo systemctl enable docker
docker --version

github make runner
choose linux
copy pasta stuff to aws terminal

aws make service runner
sudo ./svc.sh install
sudo ./svc.sh start

MONGO
Create project
Create Database
Network Access -> IP
Security -> Quick Start -> Add user

MONGO_PASSWORD to github secrets
Allow all traffic to the instance

Run node:
docker run -d -p 4000:4000 --name mern-test-container -e MONGO_PASSWORD='test@123' mern-test

Run React:
docker run -d -p 3000:80 --name mern-test-react-container -e REACT_APP_NODE_ENV='production' -e REACT_APP_SERVER_BASE_URL='http://localhost:4000' jekku123/mern-test-react

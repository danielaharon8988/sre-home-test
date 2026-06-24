SRE Home Test Project

Overview

This project demonstrates a complete application stack including:

* Frontend (HTML)
* Backend (Node.js + Express)
* MySQL Database
* User Authentication
* Token Management
* Logging with log4js
* Kafka
* Debezium CDC (Change Data Capture)
* Kafka Consumer
* Docker Compose

⸻

Architecture

Frontend
    |
    v
Node.js Backend
    |
    v
MySQL
    |
    v
Debezium
    |
    v
Kafka
    |
    v
Consumer

⸻

Components

Frontend

Simple login page.

Features:

* Username field
* Password field
* Login button
* Sends authentication requests to backend

⸻

Backend

Node.js + Express API.

Endpoints:

GET /health

Health check endpoint.

GET /users

Returns users from database.

POST /login

Authenticates a user.

Returns:

* Login status
* Generated token

⸻

Database

MySQL database.

Tables:

users

Stores user credentials.

tokens

Stores generated authentication tokens.

Default user:

username: admin
password: admin

⸻

Logging

Implemented using log4js.

Every successful login generates a structured log:

{
  "timestamp": "...",
  "userId": 1,
  "action": "login",
  "ip": "::1"
}

⸻

Kafka

Kafka is used as the message broker.

Database change events are published to Kafka topics.

Example topic:

mysql.appdb.users

⸻

Debezium

Debezium monitors MySQL binary logs.

Every INSERT, UPDATE or DELETE operation is captured and sent to Kafka.

⸻

Consumer

Node.js Kafka consumer.

Responsibilities:

* Subscribe to Kafka topic
* Receive CDC events
* Print messages to console

⸻

Running the Project

Start all services:

docker compose up -d

Create Debezium connector:

./create-connector.sh

Run consumer:

cd consumer
node consumer.js

⸻

Testing Login

Open:

http://localhost:8080

Use:

username: admin
password: admin

Expected result:

* Login succeeds
* Token is returned
* Login event is logged

⸻

Testing CDC

Insert a user:

docker exec -it mysql mysql -uroot -proot -e "USE appdb; INSERT INTO users(username,password) VALUES ('testuser','1234');"

Expected result:

* Debezium captures the change
* Kafka receives the event
* Consumer prints the event

⸻

Technologies Used

* Node.js
* Express.js
* MySQL 8.0
* Kafka
* Debezium
* Docker
* Docker Compose
* log4js
* KafkaJS

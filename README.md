SRE Home Assignment

Overview

This project demonstrates a complete end-to-end system that combines application development, containerization, database management, event streaming, and change data capture (CDC).

The solution includes:

* Frontend login application
* Node.js backend API
* MySQL database
* Authentication and token management
* Structured logging using log4js
* Apache Kafka
* Debezium CDC integration
* Kafka Consumer
* Docker Compose orchestration

⸻

Architecture

Frontend
    |
    v
Backend (Node.js / Express)
    |
    v
MySQL
    |
    v
Debezium CDC
    |
    v
Kafka
    |
    v
Consumer

⸻

Components

Frontend

A simple login interface that allows users to authenticate against the backend service.

Features:

* Username/password login
* REST API integration
* Authentication response display

⸻

Backend

Built with Node.js and Express.

Implemented endpoints:

GET /health

Health check endpoint.

GET /users

Returns all users from the database.

POST /login

Authenticates a user and generates a unique token.

Successful login actions are logged using log4js.

⸻

Database

MySQL 8.0 database running in Docker.

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

Structured application logging is implemented using log4js.

Each successful login generates a log event containing:

* Timestamp
* User ID
* Action
* Source IP

⸻

Kafka

Kafka is used as the central event streaming platform.

Application events and CDC events are published to Kafka topics.

⸻

Debezium

Debezium monitors MySQL binary logs and captures database changes.

Supported operations:

* INSERT
* UPDATE
* DELETE

Captured events are automatically published into Kafka topics.

⸻

Consumer

Kafka consumer implemented using KafkaJS.

Responsibilities:

* Subscribe to Kafka topics
* Consume CDC events
* Display incoming messages

⸻

Running the Project

Start Infrastructure

docker compose up -d

Create Debezium Connector

./create-connector.sh

Run Consumer

cd consumer
node consumer.js

⸻

Verification

Verify Backend

curl http://localhost:3000/health

Verify Users Endpoint

curl http://localhost:3000/users

Verify Login

curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"admin"}'

Verify CDC Flow

Insert a new user:

docker exec -it mysql mysql -uroot -proot -e \
"USE appdb; INSERT INTO users(username,password) VALUES ('cdc_test','1234');"

The change will be captured by:

MySQL
→ Debezium
→ Kafka
→ Consumer

⸻

Technologies Used

* Node.js
* Express
* MySQL 8.0
* Kafka
* Debezium
* KafkaJS
* Docker
* Docker Compose
* log4js

⸻

Author

Daniel Aharon

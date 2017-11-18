# bigapp
test app

Steps to set project

1. install Node
2. install Sails js Globally using (npm install sails -g) comment
3. create new project using (sails new appName) comment and install dependencies of the project npm install (		nameOfDependencies) --save
4. create the Database configuration in config/connections.js file
	In MongoDB need to change credential
	Install: npm install sails-mongo --save
	someMongodbServer: {
	    adapter: 'sails-mongo',
	    host: 'localhost',
	    port: 27017,
	    user: 'root', //optional
	    password: 'root', //optional
	    database: 'bigapp' //optional
	},
	In MYSQL need to change credential
	Install: npm install sails-mysql --save
	someMysqlServer: {
	    adapter: 'sails-mysql',
	    host: 'localhost',
	    user: 'root', //optional
	    password: 'root', //optional
	    database: 'bigapp' //optional
	},

5. create model and controller using (sails generate api nameOfModel) comment
6. Model migration config/model.js the below comments needs to add
	connection: 'someMongodbServer',
	migrate: 'alter'
7. Add the attributs in api/models/User.js
8. Create the controller function in api/controllers/UserController.js
9. Add the router in config/router.js
10. For Policies create file in api/policies and give access in config/policies.js
===========================================

1. Register new user

Url: http://localhost:1337/siginUp
Method: POST

Request:
{
	"user_name": "dinesh",
	"email": "dinesh@bigapp.com",
	"password": "asdfasdf",
	"user_type": 2
}

Note:
user_type:
1 => admin
2 => user

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": "Created Successfully"
}

=========================================

2. Login

Url: http://localhost:1337/login
Method: POST

Request: 
{
	"email": "dinesh@bigapp.com",
	"password": "asdfasdf"
}

Response:

{
    "statusCode": 200,
    "apiStatus": true,
    "user": {
        "user_type": 2,
        "user_name": "dinesh",
        "email": "dinesh@bigapp.com",
        "password": "$2a$10$H0hKeW6q1KUkH1P6ogzO8uhr4lZdc25nz9Z0YxF00GFdsMUQ6tvMm",
        "active_status": 1,
        "delete_status": 0,
        "id": 4,
        "createdAt": "2017-11-18T14:26:22.000Z",
        "updatedAt": "2017-11-18T14:26:22.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl90eXBlIjoyLCJlbWFpbCI6ImRpbmVzaEBiaWdhcHAuY29tIiwiaWF0IjoxNTExMDE1MjYxLCJleHAiOjE1MTExMDE2NjF9.yd2egjqqI_R0v9VBiOGQiobccPbbhueyYKB0pbtN74k"
}

=========================================

3. List user Details

Url: http://localhost:1337/listUser
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:

{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "userTask": [
                {
                    "user_id": 1,
                    "task_name": "first task",
                    "task_end_date": "2017-11-19T06:48:30.000Z",
                    "discription": "test discription",
                    "active_status": 1,
                    "delete_status": 0,
                    "created_by": 1,
                    "updated_by": 1,
                    "id": 1,
                    "createdAt": "2017-11-16T07:28:25.000Z",
                    "updatedAt": "2017-11-18T07:32:14.000Z"
                }
            ],
            "user_type": 2,
            "user_name": "Dineshkumar",
            "email": "rudineshkumar@gmail.com",
            "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
            "active_status": 1,
            "delete_status": 0,
            "id": 1,
            "createdAt": "2017-11-18T06:48:30.000Z",
            "updatedAt": "2017-11-18T06:48:30.000Z"
        }
    ]
}

=========================================

4. Add Task

Url: http://localhost:1337/addTask
Method: POST

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Request: 
{
  "user_id": "1",
  "task_name": "test",
  "task_end_date": "2017-11-18 12:18:30",
  "discription": "test discription"
}

Response:

{
    "statusCode": 200,
    "apiStatus": true,
    "result": "Created Successfully"
}

=========================================

5. Edit Task

Url: http://localhost:1337/editTask?id=1
Method: PUT

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Request:

{
  "task_name": "test",
  "task_end_date": "2017-11-18 12:18:30",
  "discription": "test discription"
}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": "Updated Successfully"
}

=========================================

6. Delete Task

Url: http://localhost:1337/deleteTask?id=1
Method: PUT

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Request:
{
    "id": 2
}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": "Deleted Successfully"
}

=========================================

7. List Task

Url: http://localhost:1337/listTask
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}


Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "kumar",
                "email": "kumar@bigapp.com",
                "password": "$2a$10$5hDWYz6UQoZSODqzi37UfeGJcE.8Qqu5Vim/xP.FHTA7Crp7gYKNa",
                "active_status": 1,
                "delete_status": 0,
                "id": 3,
                "createdAt": "2017-11-18T07:46:53.000Z",
                "updatedAt": "2017-11-18T07:46:53.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test1",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 2,
            "createdAt": "2017-11-18T07:31:35.000Z",
            "updatedAt": "2017-11-18T07:31:35.000Z"
        },
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

=========================================

8. List Task with ID

Url:http://localhost:1337/listTask?id=1
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

==========================================

9. List Task after with given date

Url:http://localhost:1337/listTask?start_date=2017-11-17T06:48:30.000Z
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "kumar",
                "email": "kumar@bigapp.com",
                "password": "$2a$10$5hDWYz6UQoZSODqzi37UfeGJcE.8Qqu5Vim/xP.FHTA7Crp7gYKNa",
                "active_status": 1,
                "delete_status": 0,
                "id": 3,
                "createdAt": "2017-11-18T07:46:53.000Z",
                "updatedAt": "2017-11-18T07:46:53.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test1",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 2,
            "createdAt": "2017-11-18T07:31:35.000Z",
            "updatedAt": "2017-11-18T07:31:35.000Z"
        },
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

========================================================

10. List Task before with given date

Url:http://localhost:1337/listTask?end_date=2017-11-17T06:48:30.000Z
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "kumar",
                "email": "kumar@bigapp.com",
                "password": "$2a$10$5hDWYz6UQoZSODqzi37UfeGJcE.8Qqu5Vim/xP.FHTA7Crp7gYKNa",
                "active_status": 1,
                "delete_status": 0,
                "id": 3,
                "createdAt": "2017-11-18T07:46:53.000Z",
                "updatedAt": "2017-11-18T07:46:53.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test1",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 2,
            "createdAt": "2017-11-18T07:31:35.000Z",
            "updatedAt": "2017-11-18T07:31:35.000Z"
        },
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

========================================================

11. Search Task with name

Url: http://localhost:1337/listTask?task_name=test
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "kumar",
                "email": "kumar@bigapp.com",
                "password": "$2a$10$5hDWYz6UQoZSODqzi37UfeGJcE.8Qqu5Vim/xP.FHTA7Crp7gYKNa",
                "active_status": 1,
                "delete_status": 0,
                "id": 3,
                "createdAt": "2017-11-18T07:46:53.000Z",
                "updatedAt": "2017-11-18T07:46:53.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test1",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 2,
            "createdAt": "2017-11-18T07:31:35.000Z",
            "updatedAt": "2017-11-18T07:31:35.000Z"
        },
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

===================================================

12. Search Task with Discription

Url: http://localhost:1337/listTask?discription=test
Method: GET

Header:
Content-Type: application/json
Authorization: Bearer {{token}}

Response:
{
    "statusCode": 200,
    "apiStatus": true,
    "result": [
        {
            "user_id": {
                "user_type": 2,
                "user_name": "kumar",
                "email": "kumar@bigapp.com",
                "password": "$2a$10$5hDWYz6UQoZSODqzi37UfeGJcE.8Qqu5Vim/xP.FHTA7Crp7gYKNa",
                "active_status": 1,
                "delete_status": 0,
                "id": 3,
                "createdAt": "2017-11-18T07:46:53.000Z",
                "updatedAt": "2017-11-18T07:46:53.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test1",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 2,
            "createdAt": "2017-11-18T07:31:35.000Z",
            "updatedAt": "2017-11-18T07:31:35.000Z"
        },
        {
            "user_id": {
                "user_type": 2,
                "user_name": "Dineshkumar",
                "email": "rudineshkumar@gmail.com",
                "password": "$2a$10$Lhtmz3Vz0G3Nult0zW37XuKK0MolaEFJu.vKHcTtTeCmvaWdtscrK",
                "active_status": 1,
                "delete_status": 0,
                "id": 1,
                "createdAt": "2017-11-18T06:48:30.000Z",
                "updatedAt": "2017-11-18T06:48:30.000Z"
            },
            "created_by": 1,
            "updated_by": null,
            "task_name": "test2",
            "task_end_date": "2017-11-18T06:48:30.000Z",
            "discription": "test discription",
            "active_status": 1,
            "delete_status": 0,
            "id": 3,
            "createdAt": "2017-11-18T14:33:27.000Z",
            "updatedAt": "2017-11-18T14:33:27.000Z"
        }
    ]
}

================================================

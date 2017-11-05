# medikq-platform

MedikQ is hospital side appointment booking and queue management platform.
It consists of a login based dashboard to be used by hospital staff to efficiently manage appointments.
It was developed based on MVC architecture with express-handlebars as templating engine.
The backend was developed in NodeJs and MongoDB as the database. It uses Redis for session store.


To run this project first make sure you have MongoDB and Redis-server running in your machine. 

Next follow these steps.

` git clone https://github.com/harishrewari/medikq-platform.git `

Then install all the node dependencies using 
`npm install`

The run the project using 
`npm start` 

Open the server at http://localhost

Note: Since the project is setup to run on port 80, this might require superuser priviliges.



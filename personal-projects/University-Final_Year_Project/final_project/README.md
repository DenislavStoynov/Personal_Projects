# Final-Project

Final Project

How to setup the project:

1. The location of the API / swagger is in Registration/Registration/Registration.sln
2. Download Microsoft SQL Server and create a database
3. In FitnessDbContext.cs replace the existing connection string with yours in optionsBuilder.UseSqlServer(@"Server=.;Database=FitnessDb;Integrated Security=True;"); (in this case, the server's name is ".")
4. Install the live server by inserting the following command in cmd: npm install -g live-server
5. Navigate to the main location, where index.html file is, open cmd and type: live-server
6. Make sure that the live server has the port of 8080. When the server is executed and the website is opened live, change the URL from 127.0.0.1:8080 to localhost:8080
7. Run the API from the Registration.sln file



How to use the project:

1. Repeat the 5th step above - run the server

2. Login to the admin panel - Email: admin@gmail.com , Password: admin (if there is not admin account, add it manually to the Admin table of the database by using the following queries:

   INSERT INTO Admin(Email, Password, Username)

   VALUES('admin@gmail.com', 'admin', 'admin')

   )

3. Add exactly three trainers from the admin dashboard (the first trainer is for beginners, second for mid-level and third for advanced users)

4. Create clients accounts

5. Enjoy!
This project is totally focused on backend using NodeJs,express and MongoDBAtlas
It is mainly focused on the core basic principles of backend like authentication token refreshment ,authentication middeleware
phot uploads of user using cloudinary for updating user and parent photo details,proper modelling of user models,bus model and driver model. it is also having role based controls
and proper middelware for role based acces of controllers with proper response messages and status code.It also includes proper centralized error middelware with asyncHandler and ApiError object 
and with atomic joins ,assigning students to users amongo db aggregation pipelines for displaying students.
1.Authentication
starting with authentication  the user is modeled in a way such that it is unique email and username both are unique both are strings. every user must give password for authentication.
The passwords are not stored directly in the mongo databased they are called in the user model before saving they are hashed with bcrypt module.
The user loggs in with usernmae,password and email during logging refresh token and access Token are created and they are set as headers refresh token is having more time than access Token 

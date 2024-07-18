![Logo](https://github.com/user-attachments/assets/b2d98199-9158-44d1-85e9-b7d135498747)

This project was developed during the July 2024 Rocketseat NLW Week and it's been currently improved.

Plann.er was created to help people organize they trips by adding their friends or family, destination, dates, activities and interest links. 
It also allows the user to alter the destination and dates and add more people to the trip. 

Simple, isn't? But who knows what tomorrow holds?

## Created with
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" heigth=60 width=60 /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" heigth=60 width=60> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-plain-wordmark.svg" height=60 width=60/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" heigth=60 width=60/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height=60 width=60 /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" height=60 width=60/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" heigth=60 width=60/>
## Functionalities developed during the event:
### Back End
RESTful API with endpoints:

![image](https://github.com/user-attachments/assets/b9d6e2eb-cb83-4ee0-92b1-dd551776d23c)
![image](https://github.com/user-attachments/assets/f7bfa72f-92a5-48bf-9abd-aa4bd1f1f631)

### Front End
React application with 2 pages:
- Create Trip (Initial Page) beeing totally developed during classes
![create_trip](https://github.com/user-attachments/assets/52e9175d-64dc-4557-802c-413a1293aeb4)

- Trip Detail, with only the activities beeing conected to the API.
![trip_detail](https://github.com/user-attachments/assets/4e616469-11f7-4897-8317-e7e4c8d56f46)


## Functionalities developed by me:
### Back End
- Swagger Documentation using the ``` springdoc-openapi-starter-webmvc-ui ```
- [Date validation](https://github.com/othiagosilva/NLW-Planner/commit/2ca3c88af9e48fb017b4b7b3c1332749604dc75f)
- [TripService creation](https://github.com/othiagosilva/NLW-Planner/commit/047726d12029af28a16acb084feff8d75b2ac368)
- [Tests with JUnit and Mockito](https://github.com/othiagosilva/NLW-Planner/commit/981299c52c680f1096a0ee00486c4130e3b206fd)

### Front End
Finished the Trip Detail page with all functionalities working:
- [Alter destination and date](https://github.com/othiagosilva/NLW-Planner/commit/797395abf22b498421d3c489ae6d67dd16f200b0)
- [Manage guests](https://github.com/othiagosilva/NLW-Planner/commit/e8660b8402944a1427619eff026b878dcf96df8d)
- Link register

### DevOps
- [Implementation of CI through GitHub Actions](https://github.com/othiagosilva/NLW-Planner/commit/667ebfd5d9bb16cc2b75f39ad9fa88cdb524c0f3)
- [Dockerfile creation.](https://github.com/othiagosilva/NLW-Planner/commit/8276c0d948d828d1e5a162451d226ef4bf08f21d)

## Installation

Clone the repository
```
git clone https://github.com/othiagosilva/NLW-Planner.git
```

Run the following command
```
docker-compose up --build
```

Then you are all set to go. The application will be running on:

FrontEnd
```
localhost:5173
```
BackEnd
```
localhost:8080
```
Documentation
```
localhost:8080/swagger-ui.html
```

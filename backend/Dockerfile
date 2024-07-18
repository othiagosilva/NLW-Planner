FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

COPY ../pom.xml ./

COPY backend/src backend/src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
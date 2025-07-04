FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk
COPY --from=build /target/authify-0.0.1-SNAPSHOT.jar authify.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "authify.jar"]

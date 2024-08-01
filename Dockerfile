# Použití oficiálního OpenJDK obrazu jako základního obrazu
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY gradlew .
COPY gradle gradle

COPY . .

RUN chmod +x gradlew

RUN ./gradlew build -x test

EXPOSE 8080

CMD ["java", "-jar", "build/libs/bank-system-0.0.1-SNAPSHOT.jar"]

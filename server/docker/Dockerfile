# Этап 1: Сборка
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Этап 2: Извлечение слоев (используем тот же проверенный образ)
FROM eclipse-temurin:17-jre AS layer-extractor
WORKDIR /application
# Копируем jar из этапа build
COPY --from=build /app/target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# Этап 3: Финальный образ
FROM eclipse-temurin:17-jre
WORKDIR /application
COPY --from=layer-extractor /application/dependencies/ ./
COPY --from=layer-extractor /application/snapshot-dependencies/ ./
COPY --from=layer-extractor /application/spring-boot-loader/ ./
COPY --from=layer-extractor /application/application/ ./
EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "org.springframework.boot.loader.launch.JarLauncher"]
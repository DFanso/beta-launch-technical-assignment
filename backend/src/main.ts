import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useRequestLogging } from './request-logging';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
    Logger.verbose(
      `${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`,
      'Mongoose',
    );
  });

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {});

    Logger.log('Connected to MongoDB', 'Bootstrap');
  } catch (error) {
    Logger.error('Error connecting to MongoDB', error, 'Bootstrap');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
    bodyParser: true,
  });
  useRequestLogging(app);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        return new BadRequestException(messages);
      },
    }),
  );

  app.use(
    '/documentation',
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('EMS API')
    .setDescription('Employment Management System Backend API')
    .setVersion('1.0')
    .addTag('EMS')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.enableCors();

  await app.listen(5000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
      credentials: true,
      origin: process.env.API_CLIENT,
    });

    const config = new DocumentBuilder()
      .setTitle('Pre production')
      .setDescription('Pre production')
      .setVersion('1.0.0')
      .addTag('Events')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    // app.useGlobalGuards(JwtAuthGuard); // ! Поставит гвард для всего приложения
    // app.useGlobalPipes(new ValidationPipe()); // ! Установить пайп для всего приложения

    await app.listen(PORT, () =>
      console.log('Server has been started on port:' + PORT),
    );
  } catch (e) {
    console.log(e);
  }
}

start();

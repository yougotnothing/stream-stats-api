import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().addOAuth2().build())
  );

  app.enableCors();

  await app.listen(5174).then(() => {
    console.log(`Server started at http://localhost:${5174}`);
  });

  if (module.hot) {
    module.hot.accept('./app.module', () => {
      console.log('reloading...');
    });
    module.hot.dispose(() => app.close());
  }
}

bootstrap();

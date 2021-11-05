import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
const isProd = process.env.NODE_ENV === 'production'

async function bootstrap() {
  // 生产app
  const app = await NestFactory.create(AppModule);

  // swagger文档
  // const swaggerOptions = new DocumentBuilder()
  //   .setTitle('Vue-Tracker-Backend')
  //   .setDescription('轻量化项目进度跟踪_后端')
  //   .setVersion('0.1')
  //   .addBearerAuth() //鉴权
  //   .build()

  // const document = SwaggerModule.createDocument(app, swaggerOptions)
  // SwaggerModule.setup('doc', app, document) // doc -> swagger服务访问的路径

  await app.listen(4000);
}
bootstrap();

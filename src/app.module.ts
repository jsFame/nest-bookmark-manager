import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthController } from "./auth/auth.controller"
import { AuthService } from "./auth/auth.service"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { JwtModule } from "@nestjs/jwt"
import { UserController } from "./user/user.controller"
import { UserModule } from "./user/user.module"
import { UserService } from "./user/user.service"

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: [".env-local", ".env"],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        MODE: Joi.string().valid("development", "production", "testing").default("development"),
        PORT: Joi.number().default(1606),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}

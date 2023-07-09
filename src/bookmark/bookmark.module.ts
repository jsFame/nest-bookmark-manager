import { Module } from "@nestjs/common"
import { BookmarkController } from "./bookmark.controller"
import { BookmarkService } from "./bookmark.service"
import { AuthModule } from "../auth/auth.module"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}

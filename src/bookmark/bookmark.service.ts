import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { EditBookmarkDto } from "./dto"

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getAll(userId: number) {}

  get(id: number) {}

  edit(id: number, dto: EditBookmarkDto) {}

  delete(id: number) {}
}

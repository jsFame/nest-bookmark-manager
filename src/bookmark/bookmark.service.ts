import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateBookmarkDto, EditBookmarkDto } from "./dto"

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getAll(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    })
  }

  get(id: number) {}

  async create(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: userId,
        ...dto,
      },
    })
    return bookmark
  }

  edit(id: number, dto: EditBookmarkDto) {}

  delete(id: number) {}
}

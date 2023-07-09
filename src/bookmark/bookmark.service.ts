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

  get(id: number) {
    return this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    })
  }

  async create(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: userId,
        ...dto,
      },
    })
    return bookmark
  }

  async edit(id: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })
    return bookmark
  }

  delete(id: number) {
    return this.prisma.bookmark.delete({ where: { id } })
  }
}

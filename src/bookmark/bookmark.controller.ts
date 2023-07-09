import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../auth/guard"
import { BookmarkService } from "./bookmark.service"
import { GetUser } from "../auth/decorator"
import { CreateBookmarkDto, EditBookmarkDto } from "./dto"

@UseGuards(JwtGuard)
@Controller("bookmarks")
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser("userId") userId: number) {
    return this.bookmarkService.getAll(userId)
  }

  @Get(":id") //TODO: params
  getBookmark(@Param("id", ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.get(bookmarkId)
  }

  @Post()
  createBookmark(@GetUser("userId") userId: number, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.create(userId, dto)
  }

  @Patch(":id")
  editBookmark(
    @Param("id", ParseIntPipe) bookmarkId: number,
    @GetUser("userId") userId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.edit(bookmarkId, dto)
  }

  @Delete(":id") //TODO: params
  deleteBookmark(@Param("id", ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.delete(bookmarkId)
  }
}

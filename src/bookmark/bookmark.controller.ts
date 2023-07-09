import { Body, Controller, Delete, Get, Patch, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../auth/guard"
import { BookmarkService } from "./bookmark.service"
import { GetUser } from "../auth/decorator"
import { EditBookmarkDto } from "./dto"

@UseGuards(JwtGuard)
@Controller("bookmarks")
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser("userId") userId: number) {
    return this.bookmarkService.getAll(userId)
  }

  @Get(":bookmarkId") //TODO: params
  getBookmark(bookmarkId: number) {
    return this.bookmarkService.get(bookmarkId)
  }

  @Patch(":bookmarkId") //TODO: params
  editBookmark(bookmarkId: number, @Body() dto: EditBookmarkDto) {
    return this.bookmarkService.edit(bookmarkId, dto)
  }

  @Delete(":bookmarkId") //TODO: params
  deleteBookmark(bookmarkId: number) {
    return this.bookmarkService.delete(bookmarkId)
  }
}

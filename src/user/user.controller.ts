import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../auth/guard"

@Controller("users")
export class UserController {
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@Req() req: Request) {
    console.log(req["user"])
    return "its me"
  }
}

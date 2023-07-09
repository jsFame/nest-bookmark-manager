import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../auth/guard"
import { GetUser } from "../auth/decorator"
import { User } from "@prisma/client"
import { EditUserDto } from "./dto"
import { UserService } from "./user.service"

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@GetUser() user: User) {
    return user
  }

  @Patch()
  editUser(@GetUser("id") userId: number, @Body() dto: EditUserDto) {
    //needs service
    // we will get something in api request due to whitelist:true
    return this.userService.editUser(userId, dto)
  }
}

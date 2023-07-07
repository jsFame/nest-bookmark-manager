import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return 'I am signed up'
  }

  @Post('signin')
  signin(): string {
    return 'I am signed in'
  }
}

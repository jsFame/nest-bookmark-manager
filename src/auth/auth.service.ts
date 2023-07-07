import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  login() {
    return 'I have signed up'
  }

  signup() {
    return 'I have signed up'
  }
}

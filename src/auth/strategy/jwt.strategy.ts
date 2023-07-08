import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwtConstants: any

  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }
  }
}

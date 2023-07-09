import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"

describe("App e2e", () => {
  let app: INestApplication
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = ModuleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
  })
  it.todo("should pass")

  afterAll(async () => {
    await app.close()
  })
})

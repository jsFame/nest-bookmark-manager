import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"

describe("App e2e", () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = ModuleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    prisma = app.get(PrismaService)
    await prisma.cleanDb()
  })
  it.todo("should pass")

  afterAll(async () => {
    await app.close()
  })
})

import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as pactum from "pactum"
import { ConfigService } from "@nestjs/config"
import { AuthDto } from "../src/auth/dto"

describe("App e2e", () => {
  let app: INestApplication
  let prisma: PrismaService

  let url: string
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = ModuleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    const port = app.get(ConfigService).get("PORT") || 3333
    url = `http://localhost:${port}`
    await app.listen(port)
    prisma = app.get(PrismaService)
    await prisma.cleanDb()
  })
  it.todo("should pass")

  afterAll(async () => {
    await app.close()
  })

  describe("Auth", function () {
    describe("Sign up", () => {
      const dto: AuthDto = {
        email: "hiro_tests@gmail.com",
        password: "testing@rQfAPjfVsreWGz2",
      }
      it("should signup", () => {
        return pactum.spec().post(`${url}/auth/signup`).withBody(dto).expectStatus(HttpStatus.CREATED).inspect()
      })
    })
    describe("Sign in", () => {
      it.todo("Should signin")
    })
  })

  describe("User", () => {
    describe("Get me", () => {})
    describe("Edit me", () => {})
  })

  describe("Bookmark", () => {
    describe("Create Bookmark", function () {})
    describe("Get Bookmarks", function () {})
    describe("Get Bookmark by Id", function () {})
    describe("Edit Bookmark", function () {})
    describe("Update Bookmark", function () {})
    describe("Delete Bookmark", function () {})
  })
})

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
    pactum.request.setBaseUrl(url)
  })
  it.todo("should pass")

  afterAll(async () => {
    await app.close()
  })

  describe("Auth", function () {
    const dto: AuthDto = {
      email: "hiro_tests@gmail.com",
      password: "testing@rQfAPjfVsreWGz2",
    }
    describe("Sign up", () => {
      it("should signup", () => {
        return pactum.spec().post(`${url}/auth/signup`).withBody(dto).expectStatus(HttpStatus.CREATED).inspect()
      })

      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect()
      })

      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect()
      })

      it("should throw if not strang  password", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            email: dto.email,
            password: "123",
          })
          .expectStatus(400)
          .inspect()
      })
    })
    describe("Sign in", () => {
      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect()
      })
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect()
      })
      it("should sigin", () => {
        return pactum.spec().post("/auth/signin").withBody(dto).expectStatus(200).stores("userToken", "access_token")
      })
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

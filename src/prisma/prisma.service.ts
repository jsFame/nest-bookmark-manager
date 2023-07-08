import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          //TODO: config module
          url: "postgresql://hiro:R_Z4ssy4hOAzHRXWB-6qNg@nest-js-5295.8nk.cockroachlabs.cloud:26257/bookmark-mgmt?sslmode=verify-full",
        },
      },
    })
  }
}

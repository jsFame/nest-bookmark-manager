/*
  Warnings:

  - You are about to alter the column `id` on the `bookmarks` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `users` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_bookmarks" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "link" STRING NOT NULL,
    "userId" INT4 NOT NULL,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_bookmarks" ("createdAt","description","id","link","title","updatedAt","userId") SELECT "createdAt","description","id","link","title","updatedAt","userId" FROM "bookmarks";
DROP TABLE "bookmarks" CASCADE;
ALTER TABLE "_prisma_new_bookmarks" RENAME TO "bookmarks";
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_users" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "hash" STRING NOT NULL,
    "firstName" STRING,
    "lastName" STRING,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
DROP INDEX "users_email_key";
INSERT INTO "_prisma_new_users" ("createdAt","email","firstName","hash","id","lastName","updatedAt") SELECT "createdAt","email","firstName","hash","id","lastName","updatedAt" FROM "users";
DROP TABLE "users" CASCADE;
ALTER TABLE "_prisma_new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

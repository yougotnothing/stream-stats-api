/*
  Warnings:

  - The primary key for the `Links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `type` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('YOUTUBE', 'TWITCH', 'TROVO', 'KICK');

-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_userId_fkey";

-- DropIndex
DROP INDEX "Links_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Links" DROP CONSTRAINT "Links_pkey",
ADD COLUMN     "type" "LinkType" NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "Links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isHaveAvatar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "TwitchUser" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "login" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "broadcaster_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "offline_image_url" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitchUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitchUser_id_key" ON "TwitchUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchUser_userId_key" ON "TwitchUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchUser_login_key" ON "TwitchUser"("login");

-- CreateIndex
CREATE UNIQUE INDEX "TwitchUser_email_key" ON "TwitchUser"("email");

-- CreateIndex
CREATE INDEX "Links_id_idx" ON "Links"("id");

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitchUser" ADD CONSTRAINT "TwitchUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

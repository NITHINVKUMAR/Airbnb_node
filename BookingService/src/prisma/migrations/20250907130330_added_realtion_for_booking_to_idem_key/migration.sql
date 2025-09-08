/*
  Warnings:

  - You are about to drop the column `idempotencyKeyId` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `idempotencyKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_idempotencyKeyId_fkey`;

-- DropIndex
DROP INDEX `Booking_idempotencyKeyId_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `idempotencyKeyId`;

-- AlterTable
ALTER TABLE `idempotencyKey` ADD COLUMN `bookingId` INTEGER NULL,
    ADD COLUMN `finalizd` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `idempotencyKey_bookingId_key` ON `idempotencyKey`(`bookingId`);

-- AddForeignKey
ALTER TABLE `idempotencyKey` ADD CONSTRAINT `idempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `totalGuest` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `totalGuests` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `bookingId` on table `idempotencyKey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `idempotencyKey` DROP FOREIGN KEY `idempotencyKey_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `totalGuest`,
    ADD COLUMN `totalGuests` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `idempotencyKey` MODIFY `bookingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `idempotencyKey` ADD CONSTRAINT `idempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

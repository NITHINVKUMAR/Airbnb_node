/*
  Warnings:

  - You are about to drop the column `key` on the `idempotencyKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idemkey]` on the table `idempotencyKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idemkey` to the `idempotencyKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idempotencyKey_key_key` ON `idempotencyKey`;

-- AlterTable
ALTER TABLE `idempotencyKey` DROP COLUMN `key`,
    ADD COLUMN `idemkey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `idempotencyKey_idemkey_key` ON `idempotencyKey`(`idemkey`);

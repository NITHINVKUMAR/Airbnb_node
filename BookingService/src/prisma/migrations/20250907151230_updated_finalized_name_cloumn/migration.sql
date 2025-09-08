/*
  Warnings:

  - You are about to drop the column `finalizd` on the `idempotencyKey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `idempotencyKey` DROP COLUMN `finalizd`,
    ADD COLUMN `finalized` BOOLEAN NOT NULL DEFAULT false;

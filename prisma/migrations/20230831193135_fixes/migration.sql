/*
  Warnings:

  - You are about to drop the column `loteId` on the `racao` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Racao_loteId_fkey` ON `racao`;

-- AlterTable
ALTER TABLE `racao` DROP COLUMN `loteId`;

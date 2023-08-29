/*
  Warnings:

  - Added the required column `fazendaId` to the `Lote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lote` ADD COLUMN `fazendaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Lote` ADD CONSTRAINT `Lote_fazendaId_fkey` FOREIGN KEY (`fazendaId`) REFERENCES `Fazenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

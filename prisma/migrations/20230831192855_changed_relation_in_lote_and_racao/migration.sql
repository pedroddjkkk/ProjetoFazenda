-- DropForeignKey
ALTER TABLE `racao` DROP FOREIGN KEY `Racao_loteId_fkey`;

-- AlterTable
ALTER TABLE `lote` ADD COLUMN `racaoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Lote` ADD CONSTRAINT `Lote_racaoId_fkey` FOREIGN KEY (`racaoId`) REFERENCES `Racao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

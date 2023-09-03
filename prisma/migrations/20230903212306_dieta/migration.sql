-- DropForeignKey
ALTER TABLE `lote` DROP FOREIGN KEY `Lote_racaoId_fkey`;

-- CreateTable
CREATE TABLE `Dieta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initialDate` DATETIME(3) NOT NULL,
    `finalDate` DATETIME(3) NOT NULL,
    `loteId` INTEGER NOT NULL,
    `racaoId` INTEGER NOT NULL,
    `quantidade` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dieta` ADD CONSTRAINT `Dieta_loteId_fkey` FOREIGN KEY (`loteId`) REFERENCES `Lote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dieta` ADD CONSTRAINT `Dieta_racaoId_fkey` FOREIGN KEY (`racaoId`) REFERENCES `Racao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

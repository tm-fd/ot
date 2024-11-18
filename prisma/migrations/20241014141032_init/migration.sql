-- CreateTable
CREATE TABLE `purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `number_of_vr_glasses` INTEGER NOT NULL,
    `number_of_licenses` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_subscription` BOOLEAN NOT NULL DEFAULT false,
    `duration` INTEGER NOT NULL,
    `order_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `purchase_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_activation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchase_id` INTEGER NOT NULL,
    `activation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchase_activation` ADD CONSTRAINT `activation_purchase__fk` FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

/*
  Warnings:

  - You are about to drop the column `price` on the `subscripitons` table. All the data in the column will be lost.
  - Added the required column `priceId` to the `subscripitons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscripitons" DROP COLUMN "price",
ADD COLUMN     "priceId" TEXT NOT NULL;

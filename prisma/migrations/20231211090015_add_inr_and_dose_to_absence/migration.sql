/*
  Warnings:

  - You are about to drop the column `dose` on the `Absence` table. All the data in the column will be lost.
  - You are about to drop the column `inr` on the `Absence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Absence" DROP COLUMN "dose",
DROP COLUMN "inr";

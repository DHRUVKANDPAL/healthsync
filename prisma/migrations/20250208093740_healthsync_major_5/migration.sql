/*
  Warnings:

  - You are about to drop the column `noofbeds` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `noofdoctorsregistered` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `nooficu` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `nooflabs` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `noofopds` on the `Hospital` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "noofbeds",
DROP COLUMN "noofdoctorsregistered",
DROP COLUMN "nooficu",
DROP COLUMN "nooflabs",
DROP COLUMN "noofopds";

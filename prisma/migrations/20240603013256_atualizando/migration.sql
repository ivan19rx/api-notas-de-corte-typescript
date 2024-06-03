/*
  Warnings:

  - Made the column `descricao` on table `cursos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cursos` MODIFY `descricao` TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[mainUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_mainUrl_key" ON "Url"("mainUrl");

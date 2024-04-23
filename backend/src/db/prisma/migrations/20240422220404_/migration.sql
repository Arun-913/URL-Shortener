-- CreateTable
CREATE TABLE "Url" (
    "shortUrl" TEXT NOT NULL,
    "mainUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");

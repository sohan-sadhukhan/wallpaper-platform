/*
  Warnings:

  - You are about to drop the column `categoryId` on the `wallpaper` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wallpaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "orientation" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wallpaper" ("createdAt", "id", "imageUrl", "orientation", "userId") SELECT "createdAt", "id", "imageUrl", "orientation", "userId" FROM "wallpaper";
DROP TABLE "wallpaper";
ALTER TABLE "new_wallpaper" RENAME TO "wallpaper";
CREATE INDEX "wallpaper_userId_idx" ON "wallpaper"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

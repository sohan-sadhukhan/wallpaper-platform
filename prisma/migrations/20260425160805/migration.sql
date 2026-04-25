-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "wallpaperId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_wallpaperId_fkey" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favorite" ("createdAt", "id", "userId", "wallpaperId") SELECT "createdAt", "id", "userId", "wallpaperId" FROM "favorite";
DROP TABLE "favorite";
ALTER TABLE "new_favorite" RENAME TO "favorite";
CREATE INDEX "favorite_userId_idx" ON "favorite"("userId");
CREATE INDEX "favorite_wallpaperId_idx" ON "favorite"("wallpaperId");
CREATE UNIQUE INDEX "favorite_userId_wallpaperId_key" ON "favorite"("userId", "wallpaperId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

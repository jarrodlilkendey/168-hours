-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "token" TEXT,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "iterations" INTEGER NOT NULL,
    "keylen" INTEGER NOT NULL,
    "digest" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

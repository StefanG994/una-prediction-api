-- DropIndex
DROP INDEX "PasswordReset_token_key";

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "dose" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "inr" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "token" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "indikacija" SET DEFAULT 'Nema';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'LEKAR', 'PACIJENT');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'PACIJENT';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CVI" TEXT DEFAULT NULL,
ALTER COLUMN "CVI" SET NOT NULL,
ADD COLUMN     "birth" TIMESTAMP(3) DEFAULT NULL,
ALTER COLUMN "birth" SET NOT NULL,
ADD COLUMN     "city" TEXT DEFAULT NULL,
ALTER COLUMN "city" SET NOT NULL,
ADD COLUMN     "drug" TEXT DEFAULT NULL,
ALTER COLUMN "drug" SET NOT NULL,
ADD COLUMN     "gender" TEXT DEFAULT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION DEFAULT NULL,
ALTER COLUMN "height" SET NOT NULL,
ADD COLUMN     "indikacija" TEXT DEFAULT NULL,
ALTER COLUMN "indikacija" SET NOT NULL,
ADD COLUMN     "midName" TEXT DEFAULT NULL,
ALTER COLUMN "midName" SET NOT NULL,
ADD COLUMN     "phone" TEXT DEFAULT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION DEFAULT NULL,
ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'PACIJENT';

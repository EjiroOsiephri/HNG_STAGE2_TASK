-- CreateTable
CREATE TABLE "Organisation" (
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "OrganisationsOnUsers" (
    "userId" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "OrganisationsOnUsers_pkey" PRIMARY KEY ("userId","organisationId")
);

-- AddForeignKey
ALTER TABLE "OrganisationsOnUsers" ADD CONSTRAINT "OrganisationsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganisationsOnUsers" ADD CONSTRAINT "OrganisationsOnUsers_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

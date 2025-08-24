-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_userid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_chatid_fkey";

-- CreateTable
CREATE TABLE "public"."Files" (
    "id" TEXT NOT NULL,
    "chatid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Files" ADD CONSTRAINT "Files_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

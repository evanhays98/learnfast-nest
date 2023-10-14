import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697285611423 implements MigrationInterface {
    name = 'Init1697285611423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "base_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "pseudo" character varying NOT NULL,
                "salt" character varying NOT NULL,
                "mail" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_99d92115c40f0ae23a66819dc2e" UNIQUE ("pseudo"),
                CONSTRAINT "UQ_f512b758ebe5088b7fc0bd57200" UNIQUE ("mail"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "chapter_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "ownerId" character varying NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                CONSTRAINT "PK_d683a27f4e8b70f23633cf5fc03" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "field_translation_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "ownerId" character varying NOT NULL,
                "sentence" character varying NOT NULL,
                "answers" text array NOT NULL,
                "translation" character varying NOT NULL,
                "information" character varying,
                CONSTRAINT "PK_d9281c6c3385220f265099b66cd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."working_card_entity_history_enum" AS ENUM(
                'ADD_ONE_POINT',
                'MARK_AS_KNOWN',
                'MISS_ANSWER',
                'RESET_CARD',
                'FINISH_CARD'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "working_card_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "ownerId" character varying NOT NULL,
                "cardId" uuid NOT NULL,
                "points" integer NOT NULL DEFAULT '0',
                "maxPoints" integer NOT NULL DEFAULT '5',
                "isValidate" boolean NOT NULL DEFAULT false,
                "startedAt" TIMESTAMP,
                "history" "public"."working_card_entity_history_enum" array NOT NULL DEFAULT '{}',
                CONSTRAINT "PK_66cdb584b012f5a493de76f37aa" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."card_entity_type_enum" AS ENUM('TRANSLATION')
        `);
        await queryRunner.query(`
            CREATE TABLE "card_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "ownerId" character varying NOT NULL,
                "type" "public"."card_entity_type_enum" NOT NULL,
                "chapterId" uuid NOT NULL,
                "fieldId" uuid NOT NULL,
                CONSTRAINT "REL_21a36568f9846d1bb99ba0bb8a" UNIQUE ("fieldId"),
                CONSTRAINT "PK_b9a88963999378ac2b88052a3ce" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_47c3afa41063c76151fdc11e15c" FOREIGN KEY ("cardId") REFERENCES "card_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_21a36568f9846d1bb99ba0bb8a9" FOREIGN KEY ("fieldId") REFERENCES "field_translation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_21a36568f9846d1bb99ba0bb8a9"
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_47c3afa41063c76151fdc11e15c"
        `);
        await queryRunner.query(`
            DROP TABLE "card_entity"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."card_entity_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "working_card_entity"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."working_card_entity_history_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "field_translation_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "chapter_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "base_entity"
        `);
    }

}

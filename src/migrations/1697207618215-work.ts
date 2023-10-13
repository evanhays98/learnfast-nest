import { MigrationInterface, QueryRunner } from 'typeorm';

export class Work1697207618215 implements MigrationInterface {
  name = 'Work1697207618215';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
                "sentence" character varying NOT NULL,
                "answer" character varying NOT NULL,
                "information" character varying,
                CONSTRAINT "PK_d9281c6c3385220f265099b66cd" PRIMARY KEY ("id")
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
            DROP TABLE "card_entity"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."card_entity_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "field_translation_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "chapter_entity"
        `);
  }
}

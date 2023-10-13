import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkingCard1697223956578 implements MigrationInterface {
  name = 'AddWorkingCard1697223956578';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
                "points" numeric NOT NULL DEFAULT '0',
                "maxPoints" numeric NOT NULL DEFAULT '5',
                "isValidate" boolean NOT NULL DEFAULT false,
                "startedAt" TIMESTAMP,
                "history" "public"."working_card_entity_history_enum" array NOT NULL DEFAULT '{}',
                CONSTRAINT "PK_66cdb584b012f5a493de76f37aa" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_47c3afa41063c76151fdc11e15c" FOREIGN KEY ("cardId") REFERENCES "card_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_47c3afa41063c76151fdc11e15c"
        `);
    await queryRunner.query(`
            DROP TABLE "working_card_entity"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."working_card_entity_history_enum"
        `);
  }
}

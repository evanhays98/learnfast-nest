import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFieldTranslationData1698329799703
  implements MigrationInterface
{
  name = 'UpdateFieldTranslationData1698329799703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const fieldTranslationData = await queryRunner.query(
      'SELECT * FROM field_translation_entity',
    );

    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_21a36568f9846d1bb99ba0bb8a9"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
                RENAME COLUMN "fieldId" TO "fieldTranslation"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP COLUMN "fieldTranslation"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD "fieldTranslation" jsonb
        `);
    for (const row of fieldTranslationData) {
      const data = {
        sentence: row.sentence,
        answers: row.answers,
        translation: row.translation,
        information: row.information,
      };
      await queryRunner.query(
        `UPDATE "card_entity" SET "fieldTranslation" = $1 WHERE "id" = $2`,
        [JSON.stringify(data), row.cardId],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP COLUMN "fieldTranslation"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD "fieldTranslation" uuid NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
                RENAME COLUMN "fieldTranslation" TO "fieldId"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_21a36568f9846d1bb99ba0bb8a9" FOREIGN KEY ("fieldId") REFERENCES "field_translation_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}

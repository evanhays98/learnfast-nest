import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIeldTranslation1698342654693 implements MigrationInterface {
  name = 'UpdateIeldTranslation1698342654693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD "fieldTranslationId" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "UQ_6b14d75b407574c53d35bf369a1" UNIQUE ("fieldTranslationId")
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_6b14d75b407574c53d35bf369a1" FOREIGN KEY ("fieldTranslationId") REFERENCES "field_translation_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_6b14d75b407574c53d35bf369a1"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "UQ_6b14d75b407574c53d35bf369a1"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP COLUMN "fieldTranslationId"
        `);
  }
}

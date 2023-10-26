import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToOneFieldTranslation1698342047946
  implements MigrationInterface
{
  name = 'AddOneToOneFieldTranslation1698342047946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "field_translation_entity" 
      `);
    await queryRunner.query(`
      DELETE FROM "working_card_entity" 
      `);
    await queryRunner.query(`
      DELETE FROM "card_entity" 
      `);
    await queryRunner.query(`
      DELETE FROM "chapter_entity" 
      `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "ownerId"
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "updatedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "createdAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "active"
        `);
    await queryRunner.query(`
            ALTER TABLE "card_entity" DROP COLUMN "fieldTranslation"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD "fieldTranslation" jsonb
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "active" boolean NOT NULL DEFAULT true
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "ownerId" character varying NOT NULL
        `);
  }
}

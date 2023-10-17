import { MigrationInterface, QueryRunner } from 'typeorm';

export class LngChapter1697562811787 implements MigrationInterface {
  name = 'LngChapter1697562811787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "chapter_entity"
            ADD "lng" character varying NOT NULL DEFAULT 'fr-FR'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "chapter_entity" DROP COLUMN "lng"
        `);
  }
}

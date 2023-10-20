import { MigrationInterface, QueryRunner } from 'typeorm';

export class Lng1697816958964 implements MigrationInterface {
  name = 'Lng1697816958964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "chapter_entity"
            ALTER COLUMN "lng"
            SET DEFAULT 'fr_FR'
        `);
    await queryRunner.query(`
            UPDATE "chapter_entity"
            SET "lng" = 'fr_FR'
            WHERE "lng" = 'fr-FR'
        `);
    await queryRunner.query(`
            UPDATE "chapter_entity"
            SET "lng" = 'en_US'
            WHERE "lng" = 'en-US'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "chapter_entity"
            ALTER COLUMN "lng"
            SET DEFAULT 'fr-FR'
        `);
  }
}

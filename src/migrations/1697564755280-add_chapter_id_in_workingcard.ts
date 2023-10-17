import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChapterIdInWorkingcard1697564755280
  implements MigrationInterface
{
  name = 'AddChapterIdInWorkingcard1697564755280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD "chapterId" character varying
        `);
    await queryRunner.query(`
            UPDATE "working_card_entity" AS wc
            SET "chapterId" = (
              SELECT ce."chapterId"
              FROM "card_entity" AS ce
              WHERE wc."cardId" = ce."id"
  )
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP COLUMN "chapterId"
        `);
  }
}

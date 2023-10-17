import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrectChapterCards1697575735171 implements MigrationInterface {
    name = 'CorrectChapterCards1697575735171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "working_card_entity" ALTER COLUMN "chapterId" TYPE uuid USING "chapterId"::uuid');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "working_card_entity" ALTER COLUMN "chapterId" TYPE character varying USING "chapterId"::character varying');
    }

}

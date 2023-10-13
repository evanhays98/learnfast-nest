import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWorkingCard21697235272638 implements MigrationInterface {
    name = 'AddWorkingCard21697235272638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP COLUMN "points"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD "points" integer NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP COLUMN "maxPoints"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD "maxPoints" integer NOT NULL DEFAULT '5'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP COLUMN "maxPoints"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD "maxPoints" numeric NOT NULL DEFAULT '5'
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP COLUMN "points"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD "points" numeric NOT NULL DEFAULT '0'
        `);
    }

}

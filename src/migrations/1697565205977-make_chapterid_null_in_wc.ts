import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeChapteridNullInWc1697565205977 implements MigrationInterface {
    name = 'MakeChapteridNullInWc1697565205977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ALTER COLUMN "chapterId"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ALTER COLUMN "chapterId" DROP NOT NULL
        `);
    }

}

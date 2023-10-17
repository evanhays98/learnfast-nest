import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChapterWorkingcardsRelations1697576082385 implements MigrationInterface {
    name = 'AddChapterWorkingcardsRelations1697576082385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de"
        `);
    }

}

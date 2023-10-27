import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeOnFk1698373508156 implements MigrationInterface {
    name = 'AddCascadeOnFk1698373508156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_47c3afa41063c76151fdc11e15c"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de"
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_47c3afa41063c76151fdc11e15c" FOREIGN KEY ("cardId") REFERENCES "card_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "card_entity" DROP CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de"
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity" DROP CONSTRAINT "FK_47c3afa41063c76151fdc11e15c"
        `);
        await queryRunner.query(`
            ALTER TABLE "card_entity"
            ADD CONSTRAINT "FK_d8a2d9edaaede94d38ea08e9b7d" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_e2c33220fd1379e76ad566ae0de" FOREIGN KEY ("chapterId") REFERENCES "chapter_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "working_card_entity"
            ADD CONSTRAINT "FK_47c3afa41063c76151fdc11e15c" FOREIGN KEY ("cardId") REFERENCES "card_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}

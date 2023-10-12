import { MigrationInterface, QueryRunner } from "typeorm"

export class Test1697104081516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "user"
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

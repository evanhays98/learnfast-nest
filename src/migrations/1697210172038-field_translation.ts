import { MigrationInterface, QueryRunner } from "typeorm";

export class FieldTranslation1697210172038 implements MigrationInterface {
    name = 'FieldTranslation1697210172038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "answer"
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "ownerId" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "answers" text array NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "translation" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "translation"
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "answers"
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity" DROP COLUMN "ownerId"
        `);
        await queryRunner.query(`
            ALTER TABLE "field_translation_entity"
            ADD "answer" character varying NOT NULL
        `);
    }

}

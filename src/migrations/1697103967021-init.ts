import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697103967021 implements MigrationInterface {
    name = 'Init1697103967021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "base_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "base_entity"
        `);
    }

}

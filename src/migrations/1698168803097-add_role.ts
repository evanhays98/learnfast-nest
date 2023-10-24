import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRole1698168803097 implements MigrationInterface {
  name = 'AddRole1698168803097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_entity_role_enum" AS ENUM('ANONYMOUS', 'BETA', 'ADMIN')
        `);
    await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "role" "public"."user_entity_role_enum" array NOT NULL DEFAULT '{ANONYMOUS}'
        `);
    await queryRunner.query(
      `
            INSERT INTO user_entity (id, pseudo, role, mail, password, salt, "createdAt", "updatedAt")
            VALUES (DEFAULT, $1, $2, $3, $4, $5, NOW(), NOW())`,
      [
        'admin',
        ['ADMIN', 'BETA', 'ANONYMOUS'],
        'admin@evanadmin.fr',
        'Password1!',
        'b3a8f92bb93db429a37a7683f1a2ff9c52bc9b02bb68095346d8481a83183bb2',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_entity_role_enum"
        `);
  }
}

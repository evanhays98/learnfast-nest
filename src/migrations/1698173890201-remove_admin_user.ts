import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveAdminUser1698173890201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user_entity WHERE pseudo = 'admin'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

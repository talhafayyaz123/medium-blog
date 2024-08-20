import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeTagNameUnique1723976340407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "UQ_tag_name" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_tag_name"`);
  }
}

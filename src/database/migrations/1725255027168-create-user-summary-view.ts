import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSummaryView1725255027168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE VIEW user_summary_view AS
        SELECT
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          r.name AS role_name,
          s.name AS status_name,
          f.path AS photo_url
        FROM "user" u
        LEFT JOIN role r ON u.role_id = r.id
        LEFT JOIN status s ON u.status_id = s.id
        LEFT JOIN file f ON u.photo_id = f.id
        WHERE s.name = 'Active';
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW user_summary_view`);
  }
}

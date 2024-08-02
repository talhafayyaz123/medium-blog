import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticleTagCommentPivotTable1722321193190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "slug" character varying NOT NULL, 
        "title" character varying NOT NULL, 
        "description" text, 
        "body" text,
        "author_id" integer, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_d36b2f02014b1f9f6d0f94e9f5f" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_0eae8e8d6f4a5b2a8f4a6c38e4e" UNIQUE ("slug")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "tag" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8e9e4d2a1e1a2f2d6c7d44c0a67d" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "comment" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "article_id" uuid NOT NULL, 
        "author_id" integer NOT NULL, 
        "body" text NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8a7e9e8d1e1a2f2e6d6d44c0a67e" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "article_tag" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "article_id" uuid NOT NULL, 
        "tag_id" uuid NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_9f26b2f0c4d4f37e1a3b97867d3" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_article_tag_article_tag" UNIQUE ("article_id", "tag_id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "follow" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "follower_id" integer NOT NULL, 
        "following_id" integer NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_0e7e9d2b1e2a2d2c6c7d44c0a67d" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_follow_follower_following" UNIQUE ("follower_id", "following_id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "user_favorite_article" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "user_id" integer NOT NULL, 
        "article_id" uuid NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_1a7e9d2b1e2a2d2c6d7d44c0a67d" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_user_favorite_article_user_article" UNIQUE ("user_id", "article_id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "article" 
        ADD CONSTRAINT "FK_9470701b13d0f33a3b97e25f075" 
        FOREIGN KEY ("author_id") REFERENCES "user"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "comment" 
        ADD CONSTRAINT "FK_040f24995f2f6cd7a2f59fdee14" 
        FOREIGN KEY ("article_id") REFERENCES "article"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "comment" 
        ADD CONSTRAINT "FK_d5c3d184c36cfdf6da5a98ed3eb" 
        FOREIGN KEY ("author_id") REFERENCES "user"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "article_tag" 
        ADD CONSTRAINT "FK_b455adfe6c9e38ae06d7e4c2b84" 
        FOREIGN KEY ("article_id") REFERENCES "article"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "article_tag" 
        ADD CONSTRAINT "FK_aea99dfb23c6d5fce7cb9677c90" 
        FOREIGN KEY ("tag_id") REFERENCES "tag"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "follow" 
        ADD CONSTRAINT "FK_16f0c3e4a6e4b9098b4cb9d92b8" 
        FOREIGN KEY ("follower_id") REFERENCES "user"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "follow" 
        ADD CONSTRAINT "FK_ead4edb7c12b1d5b6b2c890afed" 
        FOREIGN KEY ("following_id") REFERENCES "user"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_favorite_article" 
        ADD CONSTRAINT "FK_54e7da6bc2b01e3b2cb216ef55a" 
        FOREIGN KEY ("user_id") REFERENCES "user"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_favorite_article" 
        ADD CONSTRAINT "FK_6dfc7f0345a5b3e68bcd6a1f79b" 
        FOREIGN KEY ("article_id") REFERENCES "article"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_article" DROP CONSTRAINT "FK_6dfc7f0345a5b3e68bcd6a1f79b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_article" DROP CONSTRAINT "FK_54e7da6bc2b01e3b2cb216ef55a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_ead4edb7c12b1d5b6b2c890afed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_16f0c3e4a6e4b9098b4cb9d92b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_tag" DROP CONSTRAINT "FK_aea99dfb23c6d5fce7cb9677c90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article_tag" DROP CONSTRAINT "FK_b455adfe6c9e38ae06d7e4c2b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_d5c3d184c36cfdf6da5a98ed3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_040f24995f2f6cd7a2f59fdee14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "article" DROP CONSTRAINT "FK_9470701b13d0f33a3b97e25f075"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_article"`);
    await queryRunner.query(`DROP TABLE "follow"`);
    await queryRunner.query(`DROP TABLE "article_tag"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "article"`);
  }
}

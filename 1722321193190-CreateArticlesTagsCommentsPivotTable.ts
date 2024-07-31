import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticlesTagsCommentsPivotTable1722321193190
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "slug" character varying NOT NULL, 
        "title" character varying NOT NULL, 
        "description" text, 
        "body" text,
        "author_id" integer, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_4a26b2f0c4d3777bcd4f628e0b3" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_09c0c1e1a2f1d6c6c7d44c0a67d" UNIQUE ("slug")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "tags" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "name" character varying NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "comments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "article_id" uuid NOT NULL, 
        "author_id" integer NOT NULL, 
        "body" text NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_8bf09ba754322ab9ca0dfe9ee2f" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "articles_tags" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "article_id" uuid NOT NULL, 
        "tag_id" uuid NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_73732c67f053ae4f56c7d9b2787" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_articles_tags_article_tag" UNIQUE ("article_id", "tag_id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "follow" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "follower_id" integer NOT NULL, 
        "following_id" integer NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_91554ee7a0e1055b343c574f6b5" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_follow_follower_following" UNIQUE ("follower_id", "following_id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "users_favorite_articles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "user_id" integer NOT NULL, 
        "article_id" uuid NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_22323e85d4ddfcb02a8b616b5cf" PRIMARY KEY ("id"), 
        CONSTRAINT "UQ_users_favorite_articles_user_article" UNIQUE ("user_id", "article_id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "articles" 
        ADD CONSTRAINT "FK_9470701b13d0f33a3b97e25f075" 
        FOREIGN KEY ("author_id") REFERENCES "user"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "comments" 
        ADD CONSTRAINT "FK_040f24995f2f6cd7a2f59fdee14" 
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "comments" 
        ADD CONSTRAINT "FK_d5c3d184c36cfdf6da5a98ed3eb" 
        FOREIGN KEY ("author_id") REFERENCES "user"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "articles_tags" 
        ADD CONSTRAINT "FK_b455adfe6c9e38ae06d7e4c2b84" 
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "articles_tags" 
        ADD CONSTRAINT "FK_aea99dfb23c6d5fce7cb9677c90" 
        FOREIGN KEY ("tag_id") REFERENCES "tags"("id") 
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
      `ALTER TABLE "users_favorite_articles" 
        ADD CONSTRAINT "FK_54e7da6bc2b01e3b2cb216ef55a" 
        FOREIGN KEY ("user_id") REFERENCES "user"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" 
        ADD CONSTRAINT "FK_6dfc7f0345a5b3e68bcd6a1f79b" 
        FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" DROP CONSTRAINT "FK_6dfc7f0345a5b3e68bcd6a1f79b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favorite_articles" DROP CONSTRAINT "FK_54e7da6bc2b01e3b2cb216ef55a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_ead4edb7c12b1d5b6b2c890afed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_16f0c3e4a6e4b9098b4cb9d92b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_aea99dfb23c6d5fce7cb9677c90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles_tags" DROP CONSTRAINT "FK_b455adfe6c9e38ae06d7e4c2b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_d5c3d184c36cfdf6da5a98ed3eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_040f24995f2f6cd7a2f59fdee14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_9470701b13d0f33a3b97e25f075"`,
    );
    await queryRunner.query(`DROP TABLE "users_favorite_articles"`);
    await queryRunner.query(`DROP TABLE "follow"`);
    await queryRunner.query(`DROP TABLE "articles_tags"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "articles"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1670511139243 implements MigrationInterface {
  name = 'init1670511139243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "count" integer NOT NULL DEFAULT '0', "price" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "prodImg" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product-order" ("productId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_28841524fa869aade71b0fdfadc" PRIMARY KEY ("productId", "orderId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "age" integer NOT NULL DEFAULT '15', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8df7afab455fc84fee7c9fd0a4" ON "product-order" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69082506ca875b517d210b1efb" ON "product-order" ("orderId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product-order" ADD CONSTRAINT "FK_8df7afab455fc84fee7c9fd0a47" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-order" ADD CONSTRAINT "FK_69082506ca875b517d210b1efbb" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product-order" DROP CONSTRAINT "FK_69082506ca875b517d210b1efbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-order" DROP CONSTRAINT "FK_8df7afab455fc84fee7c9fd0a47"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69082506ca875b517d210b1efb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8df7afab455fc84fee7c9fd0a4"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product-order"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}

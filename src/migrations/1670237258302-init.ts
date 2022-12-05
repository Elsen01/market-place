import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670237258302 implements MigrationInterface {
    name = 'init1670237258302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "prodImg" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "count" integer NOT NULL DEFAULT '0', "price" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "basket" ("id" SERIAL NOT NULL, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "age" integer NOT NULL DEFAULT '15', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_orders_order" ("productId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_480da59fc3dc476f97e1aaf4c08" PRIMARY KEY ("productId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_921cd7026e41c61055fc829117" ON "product_orders_order" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_088b8ad012588d0aada35b35b9" ON "product_orders_order" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "product_orders_order" ADD CONSTRAINT "FK_921cd7026e41c61055fc8291174" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_orders_order" ADD CONSTRAINT "FK_088b8ad012588d0aada35b35b99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_orders_order" DROP CONSTRAINT "FK_088b8ad012588d0aada35b35b99"`);
        await queryRunner.query(`ALTER TABLE "product_orders_order" DROP CONSTRAINT "FK_921cd7026e41c61055fc8291174"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_088b8ad012588d0aada35b35b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_921cd7026e41c61055fc829117"`);
        await queryRunner.query(`DROP TABLE "product_orders_order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "basket"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}

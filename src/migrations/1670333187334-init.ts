import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670333187334 implements MigrationInterface {
    name = 'init1670333187334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "prodImg" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "count" integer NOT NULL DEFAULT '0', "price" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-order" ("id" SERIAL NOT NULL, CONSTRAINT "PK_f9c2fa606532cf6c560d43fa9ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "age" integer NOT NULL DEFAULT '15', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_product_order_product-order" ("productId" integer NOT NULL, "productOrderId" integer NOT NULL, CONSTRAINT "PK_898dfbde1600bc05623e533fbbe" PRIMARY KEY ("productId", "productOrderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7608462f85902dcda8fd4ce14" ON "product_product_order_product-order" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_594d25245d005b4b4a2386433d" ON "product_product_order_product-order" ("productOrderId") `);
        await queryRunner.query(`CREATE TABLE "product-order_orders_order" ("productOrderId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_9512c73ce9e7585034ecbbbd7e3" PRIMARY KEY ("productOrderId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0e43df546f58ee866f0b4f373" ON "product-order_orders_order" ("productOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f5d93e189fb73798257187fd6" ON "product-order_orders_order" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "product_product_order_product-order" ADD CONSTRAINT "FK_e7608462f85902dcda8fd4ce148" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_product_order_product-order" ADD CONSTRAINT "FK_594d25245d005b4b4a2386433d6" FOREIGN KEY ("productOrderId") REFERENCES "product-order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-order_orders_order" ADD CONSTRAINT "FK_e0e43df546f58ee866f0b4f373b" FOREIGN KEY ("productOrderId") REFERENCES "product-order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product-order_orders_order" ADD CONSTRAINT "FK_4f5d93e189fb73798257187fd63" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product-order_orders_order" DROP CONSTRAINT "FK_4f5d93e189fb73798257187fd63"`);
        await queryRunner.query(`ALTER TABLE "product-order_orders_order" DROP CONSTRAINT "FK_e0e43df546f58ee866f0b4f373b"`);
        await queryRunner.query(`ALTER TABLE "product_product_order_product-order" DROP CONSTRAINT "FK_594d25245d005b4b4a2386433d6"`);
        await queryRunner.query(`ALTER TABLE "product_product_order_product-order" DROP CONSTRAINT "FK_e7608462f85902dcda8fd4ce148"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f5d93e189fb73798257187fd6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0e43df546f58ee866f0b4f373"`);
        await queryRunner.query(`DROP TABLE "product-order_orders_order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_594d25245d005b4b4a2386433d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7608462f85902dcda8fd4ce14"`);
        await queryRunner.query(`DROP TABLE "product_product_order_product-order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product-order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}

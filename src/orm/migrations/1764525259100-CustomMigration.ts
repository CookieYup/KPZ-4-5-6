import {MigrationInterface, QueryRunner} from "typeorm";

export class reateeliveryables1766956608576 implements MigrationInterface {
    name = 'reateeliveryables1766956608576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, 
            "address" character varying NOT NULL, 
            "status" character varying NOT NULL, 
            "customer_id" integer, CONSTRAINT 
            "PK_710e2d4957aa5878dfe94e4ac2f" 
            PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, 
            "full_name" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" 
            UNIQUE ("email"), 
            CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" 
            PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT 
            "FK_772d0ce0473ac2ccfa26060dbe9" 
            FOREIGN KEY ("customer_id") 
            REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT 
            "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}

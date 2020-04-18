
import { Entity, PrimaryColumn, Column, Generated } from "typeorm";

@Entity({
    name: 'Transactions'
})

export class Transaction {

    @PrimaryColumn("integer")
    @Generated()
    id?: number;   

    @Column("bit")
    isActive: boolean;

    @Column("datetime")
    purchaseDate: Date;

    @Column("integer")
    amountPaid: number;

    @Column("integer")
    customerId: number;

    @Column("integer")
    planId: number;


}

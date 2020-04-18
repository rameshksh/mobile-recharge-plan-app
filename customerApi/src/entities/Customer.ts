
import { Entity, PrimaryColumn, Column, Generated } from "typeorm";

@Entity({
    name: 'Customers'
})
export class Customer {

    @PrimaryColumn("integer")
    @Generated()
    id?: number;

    @Column("text")
    name: string;   

    @Column("text")
    phone: string;

    @Column("text")
    email: string;

    @Column("bit")
    isActive: boolean;
}

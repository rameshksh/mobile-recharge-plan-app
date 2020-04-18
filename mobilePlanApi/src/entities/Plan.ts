
import { Entity, PrimaryColumn, Column, Generated } from "typeorm";

@Entity({
    name: 'Plans'
})
export class Plan {

    @PrimaryColumn("integer")
    @Generated()
    id?: number;

    @Column("text")
    name: string;

    @Column("integer")
    planTypeId: string;

    @Column("integer")
    amount: number;

    @Column("integer")
    validity: number;

    @Column("bit")
    isActive: boolean;

    @Column("integer")
    data: number;

    @Column("text")
    dataMesurementUnit: string;

    @Column("integer")
    talkTime: number;

    @Column("integer")
    talkTimeValidity: number;

    @Column("integer")
    dataValidity: number;
}

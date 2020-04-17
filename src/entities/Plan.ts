
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

    @Column("text")
    planTypeId: string;

    @Column()
    amount: number;

    @Column()
    validity: number;

    @Column()
    isActive: number;

    @Column()
    data: number;

    @Column()
    dataMesurementUnit: number;

    @Column()
    talkTime: number;

    @Column()
    talkTimeValidity: number;

    @Column()
    dataValidity: number;

}

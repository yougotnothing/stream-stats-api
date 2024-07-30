import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_entity')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: UUID;

	@Column('varchar', { length: 100, unique: true })
	name: string;

	@Column('varchar', { length: 128, unique: true })
	email: string;

	@Column('varchar')
	password: string;

	@Column('varchar')
	avatar_url: string;
}
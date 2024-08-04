import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LinksEntity } from './links.entity';
import * as bcrypt from 'bcrypt';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  @Column('varchar', { length: 128, unique: true })
  email: string;

  @Column('varchar')
  avatar: string;

  @Column('varchar', { length: 74 })
  password: string;

  @Column('varchar')
  avatar_url: string;

  @OneToMany(() => LinksEntity, links => links.user_id)
  links: LinksEntity[];

  async validate(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

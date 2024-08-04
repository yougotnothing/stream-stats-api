import { UUID } from 'crypto';
import { Links } from 'enum/links';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('links_entity')
export class LinksEntity {
  @PrimaryColumn('uuid')
  user_id: UUID;

  @ManyToOne(() => UserEntity, user => user.id)
  links: Record<Links, { isActive: boolean; link: string | null }>;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description?: string | undefined | null;

  @Column("int")
  duration: number;

  @Column("int")
  price: number;
}

export { Movie };

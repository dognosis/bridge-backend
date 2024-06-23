interface Repository<T> {
  create?(): Promise<T>;
  get?(id: string): Promise<T>;
  getAll?(): Promise<T[]>;
  update?(): Promise<T>;
  delete?(id: string): Promise<T>;
}

export type { Repository };

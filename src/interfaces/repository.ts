interface Repository<T> {
  create?(data: any): Promise<T>;
  get?(id: string): Promise<T>;
  getAll?(): Promise<T[]>;
  update?(id: string, data: any): Promise<T>;
  delete?(id: string): Promise<T>;
}

export type { Repository };

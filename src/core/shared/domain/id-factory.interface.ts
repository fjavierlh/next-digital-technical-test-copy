export interface IdFactory<T> {
  create(value: string): T;
  equals(id1: T, id2: T): boolean;
}

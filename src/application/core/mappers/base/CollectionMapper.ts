
export default interface CollectionMapper<F, T> {
  mapCollection(from: F[]): T[];
  reverseMapCollection(to: T[]): F[];
}

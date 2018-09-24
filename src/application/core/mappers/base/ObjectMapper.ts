
export default interface ObjectMapper<F, T> {
  map(from: F): T;
  reverseMap(to: T): F;
}

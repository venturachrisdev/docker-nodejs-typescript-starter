import CollectionMapper from './CollectionMapper';
import ObjectMapper from './ObjectMapper';

export default abstract class EntityMapper<Entity, Model>
  implements CollectionMapper<Entity, Model>, ObjectMapper<Entity, Model> {

  abstract map(from: Entity): Model;
  abstract reverseMap(to: Model): Entity;

  mapCollection(from: Entity[]): Model[] {
    const models: Model[] = [];
    if (from && from.length) {
      for (const entity of from) {
        models.push(this.map(entity));
      }
    }
    return models;
  }

  reverseMapCollection(to: Model[]): Entity[] {
    const entities: Entity[] = [];

    if (to && to.length) {
      for (const model of to) {
        entities.push(this.reverseMap(model));
      }
    }
    return entities;
  }

}

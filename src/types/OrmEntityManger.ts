import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type OrmEntityManger = EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;

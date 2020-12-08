/**
 * File: testConn.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:24:39 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 8th December 2020 2:33:20 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import config from '../../mikro-orm.config';
// import { MikroORM } from '@mikro-orm/core';

// export const testConnection = async (refresh: boolean = false) => {
//   // Create a schema to drop and recreate the DB from migrations
//   const orm = await MikroORM.init({
//     ...config,
//     ...{
//       dbName: process.env.TEST_DB_NAME || 'gsatest',
//       debug: false,
//     },
//   });
//   if (refresh) {
//     // Read the schema
//     const { getDropSchemaSQL } = orm.getSchemaGenerator();
//     // Get the schema to drop the current table, then run it
//     await getDropSchemaSQL()
//       .then((sql) => {
//         console.log(sql);
//         return orm.em.getDriver().execute(sql);
//       })
//       .then(() => orm.getMigrator().up())
//       .catch((err) => {
//         console.error(err);
//         // process.exit();
//       });
//   }
//   return orm;
// };

/**
 * File: gqlReq.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:24:39 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 8th December 2020 2:33:03 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */


// import { graphql, GraphQLSchema } from 'graphql';
// import { Maybe } from 'graphql/jsutils/Maybe';
// import { UserResolver } from '../../schemas/user.schema';
// import { buildSchema } from 'type-graphql';
// import { testConnection } from './testConn';

// let schema: GraphQLSchema;

// const getSchema = async () => {
//   if (!schema) {
//     schema = await buildSchema({ resolvers: [UserResolver], validate: false });
//   }
//   return schema;
// };

// export const gqlReq = async (
//   source: string,
//   variableValues?: Maybe<{ [key: string]: any }>,
//   userId?: string
// ) => {
//   const orm = await testConnection();
//   // Functions as a singleton
//   return graphql({
//     schema: await getSchema(),
//     source,
//     variableValues,
//     contextValue: {
//       req: {
//         session: {
//           userId,
//         },
//       },
//       res: { clearCookie: jest.fn() },
//       em: orm.em,
//     },
//   });
// };
// //

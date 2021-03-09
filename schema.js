import { PrismaClient } from '@prisma/client'

import { 
    GraphQLInt, 
    GraphQLList, 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString 
} from "graphql";

const prisma = new PrismaClient()

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        pid: {type: GraphQLInt},
        name: { type: GraphQLString},
        elo: { type: GraphQLInt},
        numMatches: { type: GraphQLInt},
        mainImgPath: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        players: {
            type: new GraphQLList(PlayerType),
            async resolve(parent, args) {
                const res = await axios
                    .get('link_to_database');
                return res.data;
            }
        },
        player: {
            type: PlayerType,
            args: {
                pid: { type: GraphQLInt}
            },
            resolve(parent, args) {
                const res = await axios
                    .get('link_to_database');
                return res.data;
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
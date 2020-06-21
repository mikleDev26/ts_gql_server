"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const listings_1 = require("./listings");
const Listing = new graphql_1.GraphQLObjectType({
    name: 'Listing',
    fields: {
        id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        title: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        address: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        price: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numberOfGuests: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numberOfBeds: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        numberOfBaths: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        rating: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    }
});
const query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    fields: {
        listings: {
            type: graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLNonNull(Listing))),
            resolve: () => {
                return listings_1.listings;
            }
        }
    }
});
const mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteListing: {
            type: graphql_1.GraphQLNonNull(Listing),
            args: {
                id: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: (_root, { id }) => {
                for (let i = 0; i < listings_1.listings.length; i++) {
                    if (listings_1.listings[i].id === id) {
                        return listings_1.listings.splice(i, 1)[0];
                    }
                }
                throw new Error("Failed to delete listing");
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query, mutation });

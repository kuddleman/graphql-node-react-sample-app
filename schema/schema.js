import graphql from 'graphql'

// define schema

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})


// create Root queries:
   // we want to create 4 'jumping off' points to 'enter' our Graphql:
   // 1. Grab ONE Book
   // 2. Grab ALL books
   // 3. Grab ONE author
   // 4. Grab ALL authors
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLString} },
            resolve(parent, args) {
                args.id
                // code to get data from db/other source
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
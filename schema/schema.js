import graphql from 'graphql'
import _ from 'lodash'

// define schema

const { 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt 

      } = graphql

// dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
]

const authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Pratchett', age: 66, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLInt }
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
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
               
                // code to get data from db/other source
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors,{id:args.id})
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
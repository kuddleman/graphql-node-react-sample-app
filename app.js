import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema.js'


const app = express()

// set up graphql endpoint

app.use('/graphql', graphqlHTTP({
    schema,
    //use the postman-like gui to test:  
    // localhost:4000/graphql
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log(`Now Listening for requests on port 4000`)
})
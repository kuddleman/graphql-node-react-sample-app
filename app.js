import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema.js'


const app = express()

// set up graphql endpoint

app.use('/graphql', graphqlHTTP({
    schema
}))

app.listen(4000, ()=>{
    console.log(`Now Listening for requests on port 4000`)
})
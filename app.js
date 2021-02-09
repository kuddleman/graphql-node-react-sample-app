import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema.js'
import mongoose from 'mongoose'



const app = express()

const uri ='mongodb+srv://javascriptmastery:@Swissairdc8@cluster0.pehy5.mongodb.net/graphql-netninja?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log(`MongoDB connected...`)
})
.catch(err => console.log(err))

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
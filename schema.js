const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require ('graphql');

// // Hardcoded data
// const customers = [
//     {id : '1', name: 'John Doe', email: "joh@hod.com",age:25},
//     {id : '2', name: 'Sara Doe', email: "sara@hod.com",age:24},
//     {id : '3', name: 'William Doe', email: "will@hod.com",age:15},
//     {id : '4', name: 'Steven Doe', email: "steven@hod.com",age:20},
// ]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name : 'Customer',
    fields: () =>(
        {
            id: {type : GraphQLString },
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            phone: {type: GraphQLString},
            age: {type: GraphQLInt},
            website: {type: GraphQLString},
        }
    )
})


// Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id:{ type: GraphQLString }
            },
            resolve(parentValue,args){
                // Return the customer by id
                // Local data
                // return customers.filter((c)=>{
                //     return c.id = args.id
                // })[0];
                // Remote data
                return axios.get('http://localhost:3000/customers/'+args.id)
                    .then(res => res.data);
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue,args){
                // Local data
                // return customers;
                // Remote data
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
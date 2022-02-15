const {GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                //return _.find(authors, {id: parent.authorId});
            }
        }
    }) 
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books, {authorId: parent.id});
            }
        }
    }) 
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Root entries goes here!",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {                
                //code to get data from db / other source
               //return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                //return _.find(authors, {id: args.id});                
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(_, __){
                //return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(_, __) {
                //return authors;
            }
        }
    }
});

module.exports =  new GraphQLSchema({
    query: RootQuery
})
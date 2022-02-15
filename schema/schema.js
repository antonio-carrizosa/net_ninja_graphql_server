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
                return Author.findById(parent.authorId);
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
               return Book.find({authorId: parent.id});
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
               return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                //return _.find(authors, {id: args.id});  
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(_, __){
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(_, __) {
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name:{type:  GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                const {name, age} = args;
                const author = new Author({
                    name,
                    age
                });
                
               return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                const {name, genre, authorId} = args;
                const book = new Book({
                    name, 
                    genre,
                    authorId
                });
                return book.save();
            }
        }
    }
});

module.exports =  new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
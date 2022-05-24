import { Mongo } from 'meteor/mongo';

export const TransactionsCollection = new Mongo.Collection('transactions');

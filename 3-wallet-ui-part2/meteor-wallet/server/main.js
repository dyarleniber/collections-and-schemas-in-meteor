import { Meteor } from "meteor/meteor";
import "../imports/api/ContactsCollection";
import "../imports/api/TransactionsCollection";
import "../imports/api/WalletsCollection";
import "../imports/api/ContactsMethods";
import "../imports/api/TransactionsMethods";
import "../imports/api/ContactsPublications";
import "../imports/api/WalletsPublications";
import { WalletsCollection } from "../imports/api/WalletsCollection";

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      balance: 0,
      currency: "USD",
      createdAt: new Date(),
    });
  }
});

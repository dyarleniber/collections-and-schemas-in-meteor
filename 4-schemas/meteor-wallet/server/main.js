import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import "../imports/api/ContactsCollection";
import "../imports/api/TransactionsCollection";
import "../imports/api/WalletsCollection";
import "../imports/api/ContactsMethods";
import "../imports/api/TransactionsMethods";
import "../imports/api/ContactsPublications";
import "../imports/api/WalletsPublications";
import { WalletsCollection } from "../imports/api/WalletsCollection";
import "../infra/CustomError";

const walletSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ["USD"],
    defaultValue: "USD",
  },
  createdAt: {
    type: Date,
  },
});

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    const walletData = {
      createdAt: new Date(),
    };
    const cleanWallet = walletSchema.clean(walletData);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet);
  }
});

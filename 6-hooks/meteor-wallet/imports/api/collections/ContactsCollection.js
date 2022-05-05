import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const ContactsCollection = new Mongo.Collection("contacts");

const ContactsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  imageUrl: {
    type: String,
    optional: true,
  },
  archived: {
    type: Boolean,
    defaultValue: false,
  },
  walletId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  },
});

ContactsCollection.attachSchema(ContactsSchema);

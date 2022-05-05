import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "../collections/WalletsCollection";

Meteor.publish("wallets", function publishWallets() {
  return WalletsCollection.find();
});

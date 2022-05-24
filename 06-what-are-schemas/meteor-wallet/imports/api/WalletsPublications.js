import { Meteor } from "meteor/meteor";
import { WalletsCollection } from "./WalletsCollection";

Meteor.publish("wallets", function publishWallets() {
  return WalletsCollection.find();
});

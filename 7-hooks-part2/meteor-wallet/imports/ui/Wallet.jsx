import { Meteor } from "meteor/meteor";
import React from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { Modal } from "./components/Modal";
import { SelectContact } from "./components/SelectContact";
import { ContactsCollection } from "../api/collections/ContactsCollection";
import { WalletsCollection } from "../api/collections/WalletsCollection";
import { Loading } from "./components/Loading";

export const Wallet = () => {
  const isLoadingContacts = useSubscribe("contacts");
  const isLoadingWallets = useSubscribe("wallets");
  const contacts = useFind(() =>
    ContactsCollection.find(
      { archived: { $ne: true } },
      { sort: { createdAt: -1 } }
    )
  );
  const [wallet] = useFind(() => WalletsCollection.find());
  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");

  const addTransaction = () => {
    Meteor.call(
      "transactions.insert",
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationWalletId: destinationWallet?.walletId || "",
        amount: Number(amount),
      },
      (errorResponse) => {
        if (errorResponse) {
          if (errorResponse.details) {
            errorResponse.details.forEach((error) => {
              setErrorMessage(error.message);
            });
          } else {
            setErrorMessage(errorResponse.error);
          }
        } else {
          setOpen(false);
          setDestinationWallet({});
          setAmount(0);
          setErrorMessage("");
        }
      }
    );
  };

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500">
              Main account
            </div>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
              Wallet ID:
            </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">
              {wallet._id}
            </h1>
            <div className="text-2xl font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage("");
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title={
          isTransferring
            ? "Transfer money to other wallet"
            : "Add money to your wallet"
        }
        body={
          <>
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  title="Destination contact"
                  contacts={contacts}
                  contact={destinationWallet}
                  setContact={setDestinationWallet}
                />
              </div>
            )}

            <div className="mt-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </>
        }
        footer={
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            onClick={addTransaction}
          >
            {isTransferring ? "Transfer" : "Add"}
          </button>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};

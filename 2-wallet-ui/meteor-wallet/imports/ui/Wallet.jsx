import React from "react";

export const Wallet = () => {
  const wallet = {
    _id: "123123123",
    balance: 5,
    currency: "USD",
  };

  return (
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
            >
              Add money
            </button>
            <button
              type="button"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Transfer money
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

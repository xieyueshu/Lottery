import React from "react";

export function NoTokensMessage({ selectedAddress }) {
  return (
    <>
      <p>You don't have enough ETH to make a bet transaction.</p>
      <p>
        Please make sure this account have enough ETH or switch other accout. 
        <br />
        <br />
        If you run app under hardhat, try to open a terminal in the root of the repository and run:
        <br />
        <br />
        <code>npx hardhat --network localhost faucet {selectedAddress}</code>
      </p>
    </>
  );
}

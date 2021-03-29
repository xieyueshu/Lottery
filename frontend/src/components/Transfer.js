import React from "react";

export function Transfer({ transferTokens, tokenSymbol }) {
  return (
    <div>
      <h4>Place Bet Right Now.</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (amount) {
            transferTokens(amount);
          }
        }}
      >
        <div className="form-group">
          <label>Use 1 of {tokenSymbol} to win 500 of {tokenSymbol}, Please enter a four digit number</label>
          <input
            className="form-control"
            type="number"
            maxLength="4"
            step="1"
            name="amount"
            placeholder="9999"
            required
          />
        </div>
        <div className="form-group">
          <label></label>
          <input hidden className="form-control" type="text" name="to" />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="PlaceBet" />
        </div>
      </form>
    </div>
  );
}

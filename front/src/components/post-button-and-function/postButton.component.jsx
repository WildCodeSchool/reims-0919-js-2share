import React from "react";
import { postFunction } from "./postFunction";

export const postButton = (startDate, endDate) => {
  return (
    <div>
      <button Onclick={() => postFunction(startDate, endDate)}>Valider</button>
    </div>
  );
};

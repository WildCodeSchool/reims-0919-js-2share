import React from "react";
import { postFunction } from "./postFunction";

export const postButton = (startDate, endDate) => {
  return (
    <div>
      <button onClick={() => postFunction(startDate, endDate)}>Valider</button>
    </div>
  );
};

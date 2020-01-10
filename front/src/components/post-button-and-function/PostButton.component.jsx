import React from "react";
import { postFunction } from "./postFunction";

export const PostButton = (startDate, endDate, family_id) => {
  console.log('Bingo' + startDate)
  return (
    
    <div>
      <button onClick={() => postFunction(startDate, endDate, family_id)}>Valider</button>
    </div>
  );
};

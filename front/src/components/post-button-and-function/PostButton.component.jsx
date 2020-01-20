import React from "react";
import { postFunction } from "./postFunction";

export const PostButton = ({title, startDate, endDate, family_id}) => {
  return (
    
    <div>
      <button onClick={e => {
        e.preventDefault();
        return postFunction({title, startDate, endDate, family_id})
      }}>Valider</button>
    </div>
  );
};

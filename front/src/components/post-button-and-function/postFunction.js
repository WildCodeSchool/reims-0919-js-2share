import axios from "axios";

export const postFunction = (props) => {
  axios
    .post("http://localhost:8000/events", {
      date_start: props.startDate,
      date_end: props.endDate,
      family_id: 1
    })
    .then(() => alert("Vos dates ont bien été enregistrées"));
};

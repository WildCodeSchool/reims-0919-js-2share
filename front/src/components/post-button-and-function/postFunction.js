import axios from "axios";

export const postFunction = (startDate, endDate) => {
  axios
    .post("http://localhost:8000/events", {
      date_start: startDate,
      date_end: endDate
    })
    .alert("Vos dates ont bien été enregistrées");
};

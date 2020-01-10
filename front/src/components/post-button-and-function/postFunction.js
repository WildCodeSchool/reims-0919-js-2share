import axios from "axios";

export const postFunction = (startDate, endDate, family_id) => {
  console.log('Bingo' + startDate)
  axios
    .post("http://localhost:8000/events", {
      date_start: startDate,
      date_end: endDate,
      family_id: 1
    })
    .alert("Vos dates ont bien été enregistrées");
};

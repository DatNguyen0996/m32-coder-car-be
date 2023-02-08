const fs = require("fs");
const csv = require("csvtojson");

const createData = async () => {
  let newData = await csv().fromFile("data.csv");
  let data = JSON.parse(fs.readFileSync("data.json"));

  data = newData.map((e) => {
    return {
      make: e.Make,
      model: e.Model,
      release_date: e.Year,
      transmission_type: e.Transmission_Type,
      size: e.Vehicle_Size,
      style: e.Vehicle_Style,
      price: e.MSRP,
      isDeleted: false,
    };
  });

  fs.writeFileSync("data.json", JSON.stringify(data));
};

createData();

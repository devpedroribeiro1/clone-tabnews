import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query('SELECT 1 + 1;');
  console.log(result.rows)
  response.status(200).json({
    "O que é muito massa?": "olhar por dentro dos canos da internet",
  });
}

export default status;

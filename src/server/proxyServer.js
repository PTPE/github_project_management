import express from "express";
import cors from "cors";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

const PORT = 8080;
const CLIENT_ID = "bf969790d4256f86647c";
const CLIENT_SECRET = "27743a3ff77d2e99804c0f3a78bee31f5dc4440c";

async function fetchToken(code) {
  const res = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=http://localhost:3000/redirect`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return data.access_token;
}

// async function fetchUser(token) {
//   const res = await fetch(`https://api.github.com/user`, {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// }

app.get("/code/:dynamic", async (req, res) => {
  const code = req.params.dynamic;
  const token = await fetchToken(code);
  res.json(token);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));

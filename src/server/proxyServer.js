import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
configDotenv();

const PORT = 8080;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function fetchToken(code) {
  try {
    const res = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!res.ok) throw new Error("Authentication Fails");
    const data = await res.json();

    return data.access_token;
  } catch (err) {
    console.error(err);
  }
}

app.get("/code/:dynamic", async (req, res) => {
  const code = req.params.dynamic;
  const token = await fetchToken(code);
  res.json(token);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));

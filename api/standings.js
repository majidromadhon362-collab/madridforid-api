import fetch from "node-fetch";
import admin from "firebase-admin";

// -------- FIREBASE ADMIN INIT -------- //
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_KEY))
  });
}

const db = admin.firestore();

const API_URL = "https://api.football-data.org/v4/competitions/";
const TOKEN = "43b77d08fd35475aa2983d9986949fb2";

// League IDs
const LEAGUE_MAP = {
  laliga: "PD",
  ucl: "CL",
  copa: "CUP"
};

export default async function handler(req, res) {
  try {
    const league = req.query.league || "laliga";
    const leagueId = LEAGUE_MAP[league];

    if (!leagueId) {
      return res.status(400).json({ error: "Invalid league" });
    }

    const result = await fetch(`${API_URL}${leagueId}/standings`, {
      headers: { "X-Auth-Token": TOKEN }
    });

    const json = await result.json();

    const table = json.standings[0].table;

    const rows = table.map((t) => ({
      pos: t.position,
      team: t.team.name,
      played: t.playedGames,
      gd: t.goalDifference,
      pts: t.points
    }));

    await db.collection("standings").doc(league).set({
      rows,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.json({ status: "updated", league, count: rows.length });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.toString() });
  }
}

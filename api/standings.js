import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Load Firebase Service Account from env
 * (Sudah di-save ke Vercel sebagai FIREBASE_SERVICE_KEY)
 */
const serviceAccount = JSON.parse("{" + process.env.FIREBASE_SERVICE_KEY + "}");

// Inisialisasi Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  try {
    const { league = "laliga" } = req.query;

    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key missing" });
    }

    // Mapping kode liga → ID API-Football
    const LEAGUE_MAP = {
      laliga: 140,
      epl: 39,
      ucl: 2
    };

    const leagueId = LEAGUE_MAP[league];

    if (!leagueId) {
      return res.status(400).json({ error: "Unknown league" });
    }

    // Fetch standings dari API-Football
    const url = `https://v3.football.api-sports.io/standings?league=${leagueId}&season=2024`;

    const apiRes = await fetch(url, {
      headers: {
        "x-apisports-key": apiKey
      }
    });

    const json = await apiRes.json();

    if (!json.response || json.response.length === 0) {
      return res.status(500).json({ error: "Invalid API response" });
    }

    // Ambil data standings
    const table = json.response[0].league.standings[0];

    const rows = table.map(t => ({
      pos: t.rank,
      team: t.team.name,
      played: t.all.played,
      gd: t.goalsDiff,
      pts: t.points
    }));

    // Simpan ke Firestore
    await db.collection("standings").doc(league).set({
      updatedAt: new Date(),
      rows
    });

    return res.status(200).json({
      success: true,
      league,
      rows
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
  }

export default function handler(req, res) {
  try {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const league = req.query.league || "laliga";

    const data = {
      league,
      updated: new Date().toISOString(),
      rows: [
        { pos: 1, team: "Real Madrid", played: 12, gd: 18, pts: 30 },
        { pos: 2, team: "Barcelona", played: 12, gd: 17, pts: 28 },
        { pos: 3, team: "Atletico Madrid", played: 12, gd: 13, pts: 25 },
        { pos: 4, team: "Girona", played: 12, gd: 12, pts: 22 }
      ]
    };

    return res.status(200).json(data);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server crashed" });
  }
      }

export default async function handler(req, res) {
  try {
    const league = req.query.league || "laliga";

    // Mapping liga → kode kompetisi football-data.org
    const map = {
      laliga: "PD",
      premier: "PL",
      bundesliga: "BL1",
      ucl: "CL"
    };

    const code = map[league];
    if (!code) {
      return res.status(400).json({ error: "Invalid league" });
    }

    const apiUrl = `https://api.football-data.org/v4/competitions/${code}/standings`;

    const response = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "API request failed" });
    }

    const data = await response.json();

    const table = data.standings[0].table.map(row => ({
      pos: row.position,
      team: row.team.name,
      played: row.playedGames,
      gd: row.goalDifference,
      pts: row.points
    }));

    return res.status(200).json({
      league: league,
      updated: new Date().toISOString(),
      rows: table
    });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
      }      rows
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

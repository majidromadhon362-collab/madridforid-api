module.exports = (req, res) => {
  try {
    const league = req.query.league || "laliga";

    // ===============================
    // DATA PER LEAGUE
    // ===============================

    // 🇪🇸 LA LIGA
    const laliga_rows = [
      { pos:1, team:"Real Madrid", played:12, gd:"+18", pts:30 },
      { pos:2, team:"Barcelona", played:12, gd:"+10", pts:27 },
      { pos:3, team:"Atletico Madrid", played:12, gd:"+9", pts:24 },
      { pos:4, team:"Girona", played:12, gd:"+8", pts:22 },
      { pos:5, team:"Real Betis", played:12, gd:"+6", pts:20 },
      { pos:6, team:"Real Sociedad", played:12, gd:"+3", pts:19 },
      { pos:7, team:"Valencia", played:12, gd:"+1", pts:18 },
      { pos:8, team:"Villarreal", played:12, gd:"0", pts:17 },
      { pos:9, team:"Athletic Bilbao", played:12, gd:"-2", pts:15 },
      { pos:10, team:"Osasuna", played:12, gd:"-4", pts:14 },
      { pos:11, team:"Getafe", played:12, gd:"-5", pts:13 },
      { pos:12, team:"Rayo Vallecano", played:12, gd:"-6", pts:12 },
      { pos:13, team:"Sevilla", played:12, gd:"-6", pts:12 },
      { pos:14, team:"Las Palmas", played:12, gd:"-7", pts:11 },
      { pos:15, team:"Mallorca", played:12, gd:"-8", pts:10 },
      { pos:16, team:"Celta Vigo", played:12, gd:"-9", pts:9 },
      { pos:17, team:"Cadiz", played:12, gd:"-10", pts:8 },
      { pos:18, team:"Alaves", played:12, gd:"-12", pts:7 },
      { pos:19, team:"Granada", played:12, gd:"-14", pts:6 },
      { pos:20, team:"Almeria", played:12, gd:"-16", pts:5 }
    ];

    // ⭐ UCL (contoh data fix)
    const ucl_rows = [
      { pos:1, team:"Real Madrid", played:4, gd:"+10", pts:12 },
      { pos:2, team:"Napoli", played:4, gd:"+3", pts:7 },
      { pos:3, team:"Braga", played:4, gd:"-5", pts:3 },
      { pos:4, team:"Union Berlin", played:4, gd:"-8", pts:1 }
    ];

    // 🏆 Copa del Rey (dummy)
    const copa_rows = [
      { pos:1, team:"Real Madrid", played:1, gd:"+2", pts:3 },
      { pos:2, team:"Sevilla", played:1, gd:"+1", pts:3 },
      { pos:3, team:"Barcelona", played:1, gd:"0", pts:1 },
      { pos:4, team:"Valencia", played:1, gd:"0", pts:1 }
    ];

    // ===============================
    // PILIH DATA BERDASARKAN LEAGUE
    // ===============================
    const table = {
      laliga: laliga_rows,
      ucl: ucl_rows,
      copa: copa_rows
    };

    const rows = table[league] || laliga_rows; // default La Liga

    res.status(200).json({
      league,
      updated: new Date().toISOString(),
      rows
    });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

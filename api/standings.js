export default function handler(req, res) {
  const league = req.query.league || "laliga";

  // Dummy 20 tim — biar Show All jalan
  const rows = [
    {pos:1, team:"Real Madrid", played:12, gd:18, pts:30},
    {pos:2, team:"Barcelona", played:12, gd:17, pts:28},
    {pos:3, team:"Atletico Madrid", played:12, gd:13, pts:25},
    {pos:4, team:"Girona", played:12, gd:12, pts:22},
    {pos:5, team:"Real Betis", played:12, gd:6, pts:20},
    {pos:6, team:"Real Sociedad", played:12, gd:5, pts:19},
    {pos:7, team:"Valencia", played:12, gd:3, pts:17},
    {pos:8, team:"Villarreal", played:12, gd:1, pts:16},
    {pos:9, team:"Athletic Bilbao", played:12, gd:0, pts:16},
    {pos:10, team:"Osasuna", played:12, gd:-1, pts:15},
    {pos:11, team:"Getafe", played:12, gd:-2, pts:14},
    {pos:12, team:"Rayo Vallecano", played:12, gd:-3, pts:13},
    {pos:13, team:"Sevilla", played:12, gd:-4, pts:12},
    {pos:14, team:"Las Palmas", played:12, gd:-5, pts:12},
    {pos:15, team:"Mallorca", played:12, gd:-6, pts:11},
    {pos:16, team:"Celta Vigo", played:12, gd:-7, pts:9},
    {pos:17, team:"Cadiz", played:12, gd:-8, pts:8},
    {pos:18, team:"Alaves", played:12, gd:-9, pts:7},
    {pos:19, team:"Granada", played:12, gd:-10, pts:6},
    {pos:20, team:"Almeria", played:12, gd:-12, pts:3},
  ];

  res.status(200).json({
    league: league,
    updated: new Date(),
    rows
  });
}

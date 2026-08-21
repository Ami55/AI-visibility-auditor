export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ status: "ok", message: "AI Visibility Auditor API is operational on Vercel" });
}

# Ballpark

A daily estimation game. Five real-world numbers a day, scored on how close you get.

## Deploy (no local setup needed)

1. Create a new repo at github.com/new. Name it `ballpark`, keep it public.
2. On the empty repo page, click **uploading an existing file**. Drag in
   everything from this folder, including the `src` folder. Commit.
3. Go to vercel.com, sign in with GitHub, click **Add New → Project**,
   pick the `ballpark` repo.
4. Vercel detects Vite automatically. Leave every setting alone. Click **Deploy**.
5. Two minutes later you have a live URL.

## Custom domain

GitHub Student Pack includes a free Namecheap domain for a year.
In Vercel: Project → Settings → Domains → add it, then paste the two DNS
records Vercel gives you into Namecheap. Live in about 30 minutes.

## Before you launch

- Replace `REPLACE-WITH-YOUR-DOMAIN` in `index.html` (two places).
- Add a `preview.png` (1200x630) to a `public/` folder so shared links show an image.
- Fact-check the question bank in `src/App.jsx`. Widely cited is not the same as true.

## Adding questions

Everything lives in the `QUESTIONS` array at the top of `src/App.jsx`.
Format: `{ q: "...", a: 1234, unit: "things" }`

The daily puzzle deals from a shuffled deck, so no question repeats until
the whole bank is used. 135 questions = 27 unique days. Aim for 350+.

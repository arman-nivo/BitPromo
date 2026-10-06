# BitPromo clickable prototype

Open `index.html` in any browser (double-click it). No install or server needed.
Fonts load from Google Fonts when online; it still works offline with system fonts.

Demo accounts (Sign In page, one click): business@bitpromo.demo, creator@bitpromo.demo, admin@bitpromo.demo

Source lives in `src/` (style.css, data.js, app1.js, app2.js, motion.js, guide.js, boot.js). After editing, run `sh build.sh` to rebuild `index.html`.

Fonts: Plus Jakarta Sans (headings) and Inter (text), with Hind Siliguri for Bangla.
Animations use GSAP + ScrollTrigger (`vendor/`, inlined by build.sh so the file still works offline). They switch off when the viewer has "reduce motion" turned on.
The floating "Demo guide" button walks reviewers through the business, creator and admin flows; it opens by itself once on a first visit.
All creators, businesses, orders and payments are fictional demo data. Payments are simulated.

Light mode is the default. Creator photos live in `photos/` (see `photos/README.md`).

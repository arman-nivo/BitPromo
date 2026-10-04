#!/bin/sh
# Rebuild index.html from src/
cd "$(dirname "$0")"
{
printf '%s\n' '<!doctype html>' '<html lang="en">' '<head>' '<meta charset="utf-8">' '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' \
 '<title>BitPromo</title>' '<meta name="description" content="BitPromo: promotional video marketplace prototype">' \
 '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' \
 '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Figtree:wght@400;500;600;700;800&family=Hind+Siliguri:wght@500;600&display=swap">'
echo '<style>body{margin:0}[hidden]{display:none!important}</style>'
echo '<style>'; cat src/style.css; echo '</style>'
echo '</head>'; echo '<body>'
echo '<header class="top" id="top"></header><main id="view"></main><footer class="foot" id="foot"></footer><nav class="bnav" id="bnav" aria-label="Mobile"></nav><div id="modal-root"></div><div class="toasts" id="toasts" aria-live="polite"></div>'
echo '<script src="photos/photos.js"></script>'
echo '<script>'; cat src/data.js src/app1.js src/app2.js; echo '</script>'
echo '</body>'; echo '</html>'
} > index.html

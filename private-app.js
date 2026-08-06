// Organizer per i repo GitHub dell'area privata: cartelle/sottocartelle
// virtuali (GitHub non le supporta), icone e colori assegnabili, drag&drop
// per spostare le cose, e un widget di dettaglio per ogni repo.
// File pubblico (nessun dato sensibile qui dentro): la privacy la fanno gli
// endpoint /api/*, che ricontrollano la sessione ad ogni chiamata.

const ICONS = {
  "archive": "<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\" /><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\" /><path d=\"M10 12h4\" />",
  "binary": "<rect x=\"14\" y=\"14\" width=\"4\" height=\"6\" rx=\"2\" /><rect x=\"6\" y=\"4\" width=\"4\" height=\"6\" rx=\"2\" /><path d=\"M6 20h4\" /><path d=\"M14 10h4\" /><path d=\"M6 14h2v6\" /><path d=\"M14 4h2v6\" />",
  "book": "<path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" />",
  "book-open": "<path d=\"M12 5v16\" /><path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\" />",
  "box": "<path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\" /><path d=\"m3.3 7 8.7 5 8.7-5\" /><path d=\"M12 22V12\" />",
  "boxes": "<path d=\"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z\" /><path d=\"m7 16.5-4.74-2.85\" /><path d=\"m7 16.5 5-3\" /><path d=\"M7 16.5v5.17\" /><path d=\"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z\" /><path d=\"m17 16.5-5-3\" /><path d=\"m17 16.5 4.74-2.85\" /><path d=\"M17 16.5v5.17\" /><path d=\"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z\" /><path d=\"M12 8 7.26 5.15\" /><path d=\"m12 8 4.74-2.85\" /><path d=\"M12 13.5V8\" />",
  "braces": "<path d=\"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1\" /><path d=\"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1\" />",
  "bug": "<path d=\"M12 20v-9\" /><path d=\"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z\" /><path d=\"M14.12 3.88 16 2\" /><path d=\"M21 21a4 4 0 0 0-3.81-4\" /><path d=\"M21 5a4 4 0 0 1-3.55 3.97\" /><path d=\"M22 13h-4\" /><path d=\"M3 21a4 4 0 0 1 3.81-4\" /><path d=\"M3 5a4 4 0 0 0 3.55 3.97\" /><path d=\"M6 13H2\" /><path d=\"m8 2 1.88 1.88\" /><path d=\"M9 7.13V6a3 3 0 1 1 6 0v1.13\" />",
  "cloud": "<path d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\" />",
  "code": "<path d=\"m16 18 6-6-6-6\" /><path d=\"m8 6-6 6 6 6\" />",
  "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\" />",
  "component": "<path d=\"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z\" /><path d=\"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z\" /><path d=\"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z\" /><path d=\"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z\" />",
  "cpu": "<path d=\"M12 20v2\" /><path d=\"M12 2v2\" /><path d=\"M17 20v2\" /><path d=\"M17 2v2\" /><path d=\"M2 12h2\" /><path d=\"M2 17h2\" /><path d=\"M2 7h2\" /><path d=\"M20 12h2\" /><path d=\"M20 17h2\" /><path d=\"M20 7h2\" /><path d=\"M7 20v2\" /><path d=\"M7 2v2\" /><rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" /><rect x=\"8\" y=\"8\" width=\"8\" height=\"8\" rx=\"1\" />",
  "database": "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /><path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /><path d=\"M3 12A9 3 0 0 0 21 12\" />",
  "dice-5": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /><path d=\"M16 8h.01\" /><path d=\"M8 8h.01\" /><path d=\"M8 16h.01\" /><path d=\"M16 16h.01\" /><path d=\"M12 12h.01\" />",
  "file-code": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /><path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /><path d=\"M10 12.5 8 15l2 2.5\" /><path d=\"m14 12.5 2 2.5-2 2.5\" />",
  "flame": "<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\" />",
  "flask-conical": "<path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\" /><path d=\"M6.453 15h11.094\" /><path d=\"M8.5 2h7\" />",
  "folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" />",
  "folder-git": "<circle cx=\"12\" cy=\"13\" r=\"2\" /><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" /><path d=\"M14 13h3\" /><path d=\"M7 13h3\" />",
  "folder-kanban": "<path d=\"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z\" /><path d=\"M8 10v4\" /><path d=\"M12 10v2\" /><path d=\"M16 10v6\" />",
  "folder-open": "<path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\" />",
  "gamepad-2": "<line x1=\"6\" x2=\"10\" y1=\"11\" y2=\"11\" /><line x1=\"8\" x2=\"8\" y1=\"9\" y2=\"13\" /><line x1=\"15\" x2=\"15.01\" y1=\"12\" y2=\"12\" /><line x1=\"18\" x2=\"18.01\" y1=\"10\" y2=\"10\" /><path d=\"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z\" />",
  "git-branch": "<path d=\"M15 6a9 9 0 0 0-9 9V3\" /><circle cx=\"18\" cy=\"6\" r=\"3\" /><circle cx=\"6\" cy=\"18\" r=\"3\" />",
  "git-commit-horizontal": "<circle cx=\"12\" cy=\"12\" r=\"3\" /><line x1=\"3\" x2=\"9\" y1=\"12\" y2=\"12\" /><line x1=\"15\" x2=\"21\" y1=\"12\" y2=\"12\" />",
  "git-merge": "<circle cx=\"18\" cy=\"18\" r=\"3\" /><circle cx=\"6\" cy=\"6\" r=\"3\" /><path d=\"M6 21V9a9 9 0 0 0 9 9\" />",
  "git-pull-request": "<circle cx=\"18\" cy=\"18\" r=\"3\" /><circle cx=\"6\" cy=\"6\" r=\"3\" /><path d=\"M13 6h3a2 2 0 0 1 2 2v7\" /><line x1=\"6\" x2=\"6\" y1=\"9\" y2=\"21\" />",
  "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /><path d=\"M2 12h20\" />",
  "hammer": "<path d=\"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9\" /><path d=\"m18 15 4-4\" /><path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\" />",
  "hard-drive": "<path d=\"M10 16h.01\" /><path d=\"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\" /><path d=\"M21.946 12.013H2.054\" /><path d=\"M6 16h.01\" />",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />",
  "joystick": "<path d=\"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z\" /><path d=\"M6 15v-2\" /><path d=\"M12 15V9\" /><circle cx=\"12\" cy=\"6\" r=\"3\" />",
  "layers": "<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />",
  "link": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" /><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "package": "<path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\" /><path d=\"M12 22V12\" /><polyline points=\"3.29 7 12 12 20.71 7\" /><path d=\"m7.5 4.27 9 5.15\" />",
  "palette": "<path d=\"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\" /><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "puzzle": "<path d=\"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z\" />",
  "rocket": "<path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\" /><path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09\" /><path d=\"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z\" /><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05\" />",
  "server": "<rect width=\"20\" height=\"8\" x=\"2\" y=\"2\" rx=\"2\" ry=\"2\" /><rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\" ry=\"2\" /><line x1=\"6\" x2=\"6.01\" y1=\"6\" y2=\"6\" /><line x1=\"6\" x2=\"6.01\" y1=\"18\" y2=\"18\" />",
  "settings": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /><circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\" /><path d=\"M20 2v4\" /><path d=\"M22 4h-4\" /><circle cx=\"4\" cy=\"20\" r=\"2\" />",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />",
  "swords": "<polyline points=\"14.5 17.5 3 6 3 3 6 3 17.5 14.5\" /><line x1=\"13\" x2=\"19\" y1=\"19\" y2=\"13\" /><line x1=\"16\" x2=\"20\" y1=\"16\" y2=\"20\" /><line x1=\"19\" x2=\"21\" y1=\"21\" y2=\"19\" /><polyline points=\"14.5 6.5 18 3 21 3 21 6 17.5 9.5\" /><line x1=\"5\" x2=\"9\" y1=\"14\" y2=\"18\" /><line x1=\"7\" x2=\"4\" y1=\"17\" y2=\"20\" /><line x1=\"3\" x2=\"5\" y1=\"19\" y2=\"21\" />",
  "tag": "<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\" /><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"10\" /><circle cx=\"12\" cy=\"12\" r=\"6\" /><circle cx=\"12\" cy=\"12\" r=\"2\" />",
  "terminal": "<path d=\"M12 19h8\" /><path d=\"m4 17 6-6-6-6\" />",
  "wrench": "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z\" />",
  "zap": "<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\" />",
};
const ICON_IDS = Object.keys(ICONS);
const DEFAULT_FOLDER_ICON = "folder";
const DEFAULT_REPO_ICON = "code";

const COLORS = [
  { id: "predefinito", isAccent: true },
  { id: "rosa", hue: 350, chroma: 0.16 },
  { id: "corallo", hue: 25, chroma: 0.17 },
  { id: "ambra", hue: 65, chroma: 0.15 },
  { id: "lime", hue: 120, chroma: 0.15 },
  { id: "smeraldo", hue: 155, chroma: 0.14 },
  { id: "turchese", hue: 195, chroma: 0.13 },
  { id: "azzurro", hue: 230, chroma: 0.15 },
  { id: "indaco", hue: 265, chroma: 0.15 },
  { id: "viola", hue: 300, chroma: 0.16 },
  { id: "magenta", hue: 330, chroma: 0.17 },
];
const DEFAULT_COLOR = "predefinito";

// "predefinito" segue l'accento vivo del sito (rosa sakura oggi) invece di
// un grigio piatto: le cartelle/i repo non ancora personalizzati restano
// comunque colorati e coerenti con il resto del sito.
function colorBg(colorId) {
  const c = COLORS.find((c) => c.id === colorId) || COLORS[0];
  return c.isAccent ? "var(--accent)" : `oklch(80% ${c.chroma} ${c.hue})`;
}
function colorInk(colorId) {
  const c = COLORS.find((c) => c.id === colorId) || COLORS[0];
  return c.isAccent ? "var(--accent-ink)" : `oklch(20% ${Math.min(c.chroma, 0.04)} ${c.hue})`;
}

function svgIcon(iconId, extraClass) {
  const inner = ICONS[iconId] || ICONS[DEFAULT_FOLDER_ICON];
  return `<svg class="${extraClass || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

// ---------------------------------------------------------------------------
// Stato
// ---------------------------------------------------------------------------

let repos = [];
let repoById = new Map();
let tree = { folders: {}, root: { children: [] }, repoMeta: {} };
let expanded = new Set(JSON.parse(localStorage.getItem("organizer-expanded") || "[]"));
let searchQuery = "";
let loadError = null;
let saveTimer = null;

const treeEl = document.getElementById("organizer-tree");
const searchInput = document.getElementById("organizer-search");
const newFolderBtn = document.getElementById("organizer-new-folder");
const refreshBtn = document.getElementById("organizer-refresh");
const statusEl = document.getElementById("organizer-status");

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

async function apiGet(url) {
  const res = await fetch(url, { credentials: "same-origin" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || `Errore ${res.status}`);
  return data;
}

async function apiPutTree(nextTree) {
  const res = await fetch("/api/organizer/state", {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nextTree),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error || `Errore ${res.status}`);
}

function scheduleSave(immediate) {
  clearTimeout(saveTimer);
  setStatus("Salvataggio…");
  const run = () => {
    apiPutTree(tree)
      .then(() => setStatus("Salvato"))
      .catch((err) => setStatus(`Errore salvataggio: ${err.message}`, true));
  };
  if (immediate) run();
  else saveTimer = setTimeout(run, 600);
}

function setStatus(text, isError) {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.classList.toggle("is-error", !!isError);
  if (!isError && text) {
    clearTimeout(setStatus._t);
    setStatus._t = setTimeout(() => {
      if (statusEl.textContent === text) statusEl.textContent = "";
    }, 2000);
  }
}

async function loadAll() {
  treeEl.innerHTML = renderSkeleton();
  loadError = null;
  try {
    const [repoData, treeData] = await Promise.all([
      apiGet("/api/github/repos"),
      apiGet("/api/organizer/state"),
    ]);
    repos = repoData.repos;
    repoById = new Map(repos.map((r) => [r.id, r]));
    tree = treeData.tree;
    render();
  } catch (err) {
    loadError = err.message;
    render();
  }
}

// ---------------------------------------------------------------------------
// Helper sull'albero
// ---------------------------------------------------------------------------

function isFolderId(id) {
  return typeof id === "string" && id.startsWith("f_");
}

function getPlacedIds() {
  const placed = new Set();
  for (const folder of Object.values(tree.folders)) {
    for (const child of folder.children) placed.add(child);
  }
  for (const child of tree.root.children) placed.add(child);
  return placed;
}

function getUnsortedRepos() {
  const placed = getPlacedIds();
  return repos.filter((r) => !placed.has(r.id));
}

function findParentList(id) {
  if (tree.root.children.includes(id)) return tree.root.children;
  for (const folder of Object.values(tree.folders)) {
    if (folder.children.includes(id)) return folder.children;
  }
  return null;
}

function removeFromCurrentParent(id) {
  const list = findParentList(id);
  if (list) {
    const i = list.indexOf(id);
    if (i !== -1) list.splice(i, 1);
  }
}

function isDescendantFolder(ancestorId, candidateId) {
  if (!isFolderId(ancestorId)) return false;
  const folder = tree.folders[ancestorId];
  if (!folder) return false;
  for (const child of folder.children) {
    if (child === candidateId) return true;
    if (isFolderId(child) && isDescendantFolder(child, candidateId)) return true;
  }
  return false;
}

function moveNode(id, targetFolderId, index) {
  if (targetFolderId && targetFolderId !== "root") {
    if (id === targetFolderId) return false; // non dentro se stessa
    if (isFolderId(id) && isDescendantFolder(id, targetFolderId)) return false; // niente cicli
  }

  const targetList = targetFolderId && targetFolderId !== "root" ? tree.folders[targetFolderId].children : tree.root.children;
  const sourceList = findParentList(id);
  let at = typeof index === "number" ? index : targetList.length;

  // Riordino dentro la stessa lista: rimuovere l'elemento prima di reinserirlo
  // fa scalare a sinistra tutto quello che veniva dopo, quindi un indice
  // target che era dopo la posizione di partenza va decrementato di uno.
  if (sourceList === targetList) {
    const currentIndex = sourceList.indexOf(id);
    if (currentIndex !== -1 && currentIndex < at) at -= 1;
  }

  removeFromCurrentParent(id);
  at = Math.max(0, Math.min(at, targetList.length));
  targetList.splice(at, 0, id);
  return true;
}

function createFolder(name, icon, color, parentId) {
  const id = uid("f");
  tree.folders[id] = { id, name, icon: icon || DEFAULT_FOLDER_ICON, color: color || DEFAULT_COLOR, children: [] };
  const list = parentId && parentId !== "root" ? tree.folders[parentId].children : tree.root.children;
  list.push(id);
  return id;
}

function deleteFolder(id) {
  const folder = tree.folders[id];
  if (!folder) return;
  const parentList = findParentList(id) || tree.root.children;
  const at = parentList.indexOf(id);
  // I figli non spariscono: salgono al genitore della cartella eliminata.
  parentList.splice(at, 1, ...folder.children);
  delete tree.folders[id];
  expanded.delete(id);
  persistExpanded();
}

function persistExpanded() {
  localStorage.setItem("organizer-expanded", JSON.stringify([...expanded]));
}

function allFoldersFlat() {
  const out = [];
  function walk(ids, depth) {
    for (const id of ids) {
      if (!isFolderId(id)) continue;
      const f = tree.folders[id];
      if (!f) continue;
      out.push({ id, name: f.name, depth });
      walk(f.children, depth + 1);
    }
  }
  walk(tree.root.children, 0);
  return out;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function renderSkeleton() {
  return Array.from({ length: 4 })
    .map(() => `<div class="tree-row tree-row--skeleton glass-panel skeleton"></div>`)
    .join("");
}

function matchesSearch(repo) {
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return repo.name.toLowerCase().includes(q) || (repo.description || "").toLowerCase().includes(q);
}

function render() {
  if (loadError) {
    treeEl.innerHTML = `
      <div class="tree-empty glass-panel">
        <h3>Non riesco a caricare i dati</h3>
        <p class="muted">${escapeHtml(loadError)}</p>
        <button type="button" class="btn btn-primary" id="organizer-retry">Riprova</button>
      </div>`;
    document.getElementById("organizer-retry")?.addEventListener("click", loadAll);
    return;
  }

  const isSearching = searchQuery.trim().length > 0;

  let html = "";
  if (isSearching) {
    const matches = repos.filter(matchesSearch);
    html = matches.length
      ? `<ul class="tree-list" role="list">${matches.map((r) => renderRepoRow(r, 0, null)).join("")}</ul>`
      : `<div class="tree-empty glass-panel"><p class="muted">Nessun repo trovato per &laquo;${escapeHtml(searchQuery)}&raquo;.</p></div>`;
  } else {
    const rootHtml = renderChildren(tree.root.children, 0, "root");
    const unsorted = getUnsortedRepos();
    const unsortedHtml = unsorted.length
      ? `<div class="tree-section-label">Non organizzati</div><ul class="tree-list" role="list" data-drop-list="root">${unsorted.map((r) => renderRepoRow(r, 0, "root")).join("")}</ul>`
      : "";

    html = `
      ${rootHtml || `<div class="tree-empty glass-panel"><p class="muted">Crea una cartella o trascina qui un repo per iniziare.</p></div>`}
      ${unsortedHtml}
    `;
  }

  treeEl.innerHTML = html;
  attachRowHandlers();
}

function renderChildren(ids, depth, parentId) {
  if (!ids.length) return "";
  const rows = ids
    .map((id) => (isFolderId(id) ? renderFolderNode(id, depth, parentId) : renderRepoRow(repoById.get(id), depth, parentId, id)))
    .join("");
  return `<ul class="tree-list" role="list" data-drop-list="${parentId}" style="--depth:${depth}">${rows}</ul>`;
}

function renderFolderNode(id, depth, parentId) {
  const folder = tree.folders[id];
  if (!folder) return "";
  const isOpen = expanded.has(id);
  const childCount = folder.children.length;
  const childrenHtml = isOpen ? renderChildren(folder.children, depth + 1, id) : "";

  return `
    <li class="tree-item" data-node-id="${id}" data-node-type="folder">
      <div class="tree-row" data-node-row data-node-id="${id}" style="--depth:${depth}">
        <button type="button" class="row-handle" data-drag-handle aria-label="Trascina per spostare" tabindex="-1">
          ${svgIcon("component", "handle-icon")}
        </button>
        <button type="button" class="row-disclosure${isOpen ? " is-open" : ""}" data-action="toggle" aria-expanded="${isOpen}" aria-label="${isOpen ? "Comprimi" : "Espandi"} ${escapeHtml(folder.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <span class="node-icon" style="--badge-bg:${colorBg(folder.color)};--badge-ink:${colorInk(folder.color)}">
          ${svgIcon(isOpen ? "folder-open" : folder.icon)}
        </span>
        <button type="button" class="row-main" data-action="toggle">
          <span class="row-name">${escapeHtml(folder.name)}</span>
          <span class="row-meta">${childCount} element${childCount === 1 ? "o" : "i"}</span>
        </button>
        ${renderRowMenu(id, "folder")}
      </div>
      ${childrenHtml}
    </li>`;
}

function renderRepoRow(repo, depth, parentId, idOverride) {
  if (!repo) return "";
  const meta = tree.repoMeta[repo.id] || {};
  const icon = meta.icon || DEFAULT_REPO_ICON;
  const color = meta.color || DEFAULT_COLOR;
  const id = idOverride || repo.id;

  return `
    <li class="tree-item" data-node-id="${id}" data-node-type="repo">
      <div class="tree-row" data-node-row data-node-id="${id}" style="--depth:${depth}">
        <button type="button" class="row-handle" data-drag-handle aria-label="Trascina per spostare" tabindex="-1">
          ${svgIcon("component", "handle-icon")}
        </button>
        <span class="row-disclosure row-disclosure--spacer" aria-hidden="true"></span>
        <span class="node-icon" style="--badge-bg:${colorBg(color)};--badge-ink:${colorInk(color)}">
          ${svgIcon(icon)}
        </span>
        <button type="button" class="row-main" data-action="open-repo" data-repo-id="${repo.id}">
          <span class="row-name">${escapeHtml(repo.name)}</span>
          <span class="row-meta">
            ${repo.private ? `<span class="row-badge">Privato</span>` : ""}
            ${repo.language ? escapeHtml(repo.language) : ""}
          </span>
        </button>
        <span class="row-stats">
          <span class="row-stat">${svgIcon("star", "row-stat-icon")}${formatCount(repo.stars)}</span>
        </span>
        ${renderRowMenu(id, "repo", repo.id)}
      </div>
    </li>`;
}

function renderRowMenu(nodeId, type, repoId) {
  return `
    <div class="row-menu">
      <button type="button" class="row-menu-toggle" data-action="menu" aria-haspopup="true" aria-expanded="false" aria-label="Altre azioni">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
      </button>
      <ul class="row-menu-list" hidden>
        <li><button type="button" data-action="move" data-node-id="${nodeId}">Sposta in cartella&hellip;</button></li>
        <li><button type="button" data-action="style" data-node-id="${nodeId}" data-node-type="${type}">Icona e colore&hellip;</button></li>
        ${type === "folder" ? `<li><button type="button" data-action="rename" data-node-id="${nodeId}">Rinomina</button></li>` : ""}
        ${type === "repo" ? `<li><button type="button" data-action="github" data-repo-id="${repoId}">Apri su GitHub</button></li>` : ""}
        ${type === "folder" ? `<li><button type="button" class="is-danger" data-action="delete-folder" data-node-id="${nodeId}">Elimina cartella</button></li>` : `<li><button type="button" class="is-danger" data-action="unfile" data-node-id="${nodeId}">Rimuovi dalla cartella</button></li>`}
      </ul>
    </div>`;
}

// ---------------------------------------------------------------------------
// Interazioni riga per riga (click, menu, toggle)
// ---------------------------------------------------------------------------

function closeAllMenus() {
  treeEl.querySelectorAll(".row-menu-list").forEach((m) => (m.hidden = true));
  treeEl.querySelectorAll(".row-menu-toggle").forEach((b) => b.setAttribute("aria-expanded", "false"));
}

function attachRowHandlers() {
  treeEl.querySelectorAll("[data-node-row]").forEach((row) => attachDrag(row));

  treeEl.addEventListener(
    "click",
    (e) => {
      const actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;
      const action = actionEl.dataset.action;

      if (action === "toggle") {
        const id = actionEl.closest("[data-node-row]").dataset.nodeId;
        if (expanded.has(id)) expanded.delete(id);
        else expanded.add(id);
        persistExpanded();
        render();
        return;
      }
      if (action === "open-repo") {
        const repo = repoById.get(actionEl.dataset.repoId);
        if (repo) openRepoView(repo);
        return;
      }
      if (action === "github") {
        const repo = repoById.get(actionEl.dataset.repoId);
        if (repo) window.open(repo.htmlUrl, "_blank", "noopener,noreferrer");
        return;
      }
      if (action === "menu") {
        const list = actionEl.parentElement.querySelector(".row-menu-list");
        const willOpen = list.hidden;
        closeAllMenus();
        list.hidden = !willOpen;
        actionEl.setAttribute("aria-expanded", String(willOpen));
        e.stopPropagation();
        return;
      }
      if (action === "move") {
        closeAllMenus();
        openMoveModal(actionEl.dataset.nodeId);
        return;
      }
      if (action === "style") {
        closeAllMenus();
        openStyleModal(actionEl.dataset.nodeId, actionEl.dataset.nodeType);
        return;
      }
      if (action === "rename") {
        closeAllMenus();
        openRenameModal(actionEl.dataset.nodeId);
        return;
      }
      if (action === "delete-folder") {
        closeAllMenus();
        const folder = tree.folders[actionEl.dataset.nodeId];
        if (folder && confirm(`Eliminare la cartella "${folder.name}"? Il contenuto torna al livello superiore.`)) {
          deleteFolder(actionEl.dataset.nodeId);
          render();
          scheduleSave(true);
        }
        return;
      }
      if (action === "unfile") {
        closeAllMenus();
        removeFromCurrentParent(actionEl.dataset.nodeId);
        render();
        scheduleSave(true);
        return;
      }
    },
    { once: false }
  );

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".row-menu")) closeAllMenus();
  });
}

// ---------------------------------------------------------------------------
// Drag & drop (pointer events, funziona anche su touch)
// ---------------------------------------------------------------------------

let dragState = null;

function attachDrag(rowEl) {
  const handle = rowEl.querySelector("[data-drag-handle]");
  if (!handle) return;
  handle.tabIndex = -1;
  handle.style.touchAction = "none";
  handle.addEventListener("pointerdown", (e) => onDragStart(e, rowEl));
}

function onDragStart(e, rowEl) {
  e.preventDefault();
  const nodeId = rowEl.dataset.nodeId;
  const item = rowEl.closest(".tree-item");
  const rect = rowEl.getBoundingClientRect();

  const ghost = rowEl.cloneNode(true);
  ghost.classList.add("drag-ghost");
  ghost.style.width = `${rect.width}px`;
  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  document.body.appendChild(ghost);

  item.classList.add("is-dragging-source");

  dragState = {
    nodeId,
    ghost,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top,
    dropTarget: null,
    dropMode: null, // "into" | "before" | "after"
  };

  document.addEventListener("pointermove", onDragMove);
  document.addEventListener("pointerup", onDragEnd);
  document.addEventListener("keydown", onDragCancelKey);
}

function onDragMove(e) {
  if (!dragState) return;
  dragState.ghost.style.transform = `translate(${e.clientX - dragState.offsetX - parseFloat(dragState.ghost.style.left)}px, ${e.clientY - dragState.offsetY - parseFloat(dragState.ghost.style.top)}px)`;

  clearDropHighlight();
  dragState.ghost.style.visibility = "hidden";
  const under = document.elementFromPoint(e.clientX, e.clientY);
  dragState.ghost.style.visibility = "";
  const targetRow = under?.closest("[data-node-row]");
  if (!targetRow || targetRow.closest(".tree-item").classList.contains("is-dragging-source")) {
    dragState.dropTarget = null;
    return;
  }

  const targetId = targetRow.dataset.nodeId;
  const targetType = targetRow.closest(".tree-item").dataset.nodeType;
  const rect = targetRow.getBoundingClientRect();

  if (targetType === "folder") {
    dragState.dropTarget = targetId;
    dragState.dropMode = "into";
    targetRow.classList.add("is-drop-into");
  } else {
    const before = e.clientY < rect.top + rect.height / 2;
    dragState.dropTarget = targetId;
    dragState.dropMode = before ? "before" : "after";
    targetRow.classList.add(before ? "is-drop-before" : "is-drop-after");
  }
}

function clearDropHighlight() {
  treeEl.querySelectorAll(".is-drop-into, .is-drop-before, .is-drop-after").forEach((el) => {
    el.classList.remove("is-drop-into", "is-drop-before", "is-drop-after");
  });
}

function onDragEnd() {
  if (!dragState) return finishDrag();
  const { nodeId, dropTarget, dropMode } = dragState;

  if (dropTarget && dropTarget !== nodeId) {
    if (dropMode === "into") {
      moveNode(nodeId, dropTarget);
    } else {
      const parentList = findParentList(dropTarget) || tree.root.children;
      let idx = parentList.indexOf(dropTarget);
      if (dropMode === "after") idx += 1;
      const targetParentId = parentList === tree.root.children ? "root" : Object.values(tree.folders).find((f) => f.children === parentList)?.id;
      moveNode(nodeId, targetParentId, idx);
    }
    render();
    scheduleSave(true);
  }

  finishDrag();
}

function onDragCancelKey(e) {
  if (e.key === "Escape") finishDrag();
}

function finishDrag() {
  clearDropHighlight();
  dragState?.ghost.remove();
  treeEl.querySelectorAll(".is-dragging-source").forEach((el) => el.classList.remove("is-dragging-source"));
  document.removeEventListener("pointermove", onDragMove);
  document.removeEventListener("pointerup", onDragEnd);
  document.removeEventListener("keydown", onDragCancelKey);
  dragState = null;
}

// ---------------------------------------------------------------------------
// Modal generico (stesso pattern del sito: div + hidden, non <dialog>)
// ---------------------------------------------------------------------------

function openModal(el) {
  document.querySelectorAll(".organizer-app").forEach((a) => a.setAttribute("inert", ""));
  el.hidden = false;
  document.body.style.overflow = "hidden";
  el.querySelector("[autofocus]")?.focus();
}

function closeModal(el) {
  el.hidden = true;
  document.querySelectorAll(".organizer-app").forEach((a) => a.removeAttribute("inert"));
  document.body.style.overflow = "";
}

function setupModalDismiss(el) {
  el.addEventListener("click", (e) => {
    if (e.target === el) closeModal(el);
  });
  el.querySelectorAll("[data-close-modal]").forEach((btn) => btn.addEventListener("click", () => closeModal(el)));
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".modal-overlay:not([hidden])").forEach((m) => closeModal(m));
});

// ---------------------------------------------------------------------------
// Vista repo a schermo intero: header + tab (Panoramica / File / Issue / ...)
// ---------------------------------------------------------------------------

const organizerMainEl = document.getElementById("organizer-main");
const repoViewEl = document.getElementById("repo-view");
const browseBodyEl = document.getElementById("browse-body");
const browseBreadcrumbEl = document.getElementById("browse-breadcrumb");

let currentRepo = null;
let activeRepoTab = "overview";

const COMING_SOON_COPY = {
  issues: { icon: "bug", title: "Le issue arrivano presto", text: "Questa sezione mostrera' le issue del repository direttamente da qui." },
  wiki: { icon: "book-open", title: "La wiki arriva presto", text: "Questa sezione mostrera' (e in futuro permettera' di modificare) le pagine wiki del repository." },
  settings: { icon: "settings", title: "Le impostazioni arrivano presto", text: "Qui potrai gestire alcune impostazioni del repository, da definire insieme." },
};

function renderComingSoon(tab) {
  const copy = COMING_SOON_COPY[tab];
  const panel = document.getElementById(`repo-tab-${tab}`);
  if (!copy || panel.dataset.rendered) return;
  panel.dataset.rendered = "1";
  panel.innerHTML = `
    <div class="repo-tab-panel-empty glass-panel">
      <span class="flow-icon">${svgIcon(copy.icon)}</span>
      <h3>${escapeHtml(copy.title)}</h3>
      <p class="muted">${escapeHtml(copy.text)}</p>
    </div>`;
}

function openRepoView(repo) {
  currentRepo = repo;
  organizerMainEl.hidden = true;
  repoViewEl.hidden = false;

  const icon = tree.repoMeta[repo.id]?.icon || DEFAULT_REPO_ICON;
  const color = tree.repoMeta[repo.id]?.color || DEFAULT_COLOR;
  const iconWrap = document.getElementById("repo-view-icon-wrap");
  iconWrap.innerHTML = svgIcon(icon);
  iconWrap.style.setProperty("--badge-bg", colorBg(color));
  iconWrap.style.setProperty("--badge-ink", colorInk(color));

  document.getElementById("repo-view-title").textContent = repo.name;
  document.getElementById("repo-view-owner").textContent = repo.owner;
  document.getElementById("repo-view-visibility").textContent = repo.private ? "Privato" : "Pubblico";
  document.getElementById("repo-view-visibility").className = `row-badge${repo.private ? " row-badge--private" : ""}`;
  document.getElementById("repo-view-github").href = repo.htmlUrl;

  document.getElementById("repo-view-desc").textContent = repo.description || "Nessuna descrizione.";
  document.getElementById("repo-view-stats").innerHTML = `
    <span class="stat">${svgIcon("star")} ${formatCount(repo.stars)}</span>
    <span class="stat">${svgIcon("git-branch")} ${formatCount(repo.forks)}</span>
    <span class="stat">${svgIcon("bug")} ${formatCount(repo.openIssues)}</span>
  `;
  const facts = [
    ["Linguaggio", repo.language || "—"],
    ["Ultimo aggiornamento", formatDate(repo.updatedAt)],
    ["Creato il", formatDate(repo.createdAt)],
    ["Licenza", repo.license || "Nessuna"],
    ["Branch predefinito", repo.defaultBranch || "—"],
  ];
  document.getElementById("repo-view-facts").innerHTML = facts
    .map(([k, v]) => `<div class="fact-row"><span class="fact-key">${escapeHtml(k)}</span><span class="fact-value">${escapeHtml(v)}</span></div>`)
    .join("");
  document.getElementById("repo-view-topics").innerHTML = repo.topics.length
    ? repo.topics.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")
    : "";

  // Ogni tab tranne Panoramica riparte da zero quando si apre un repo diverso.
  document.querySelectorAll(".repo-tab-panel[data-rendered]").forEach((p) => delete p.dataset.rendered);
  browseState = null;
  switchRepoTab("overview");
}

function closeRepoView() {
  repoViewEl.hidden = true;
  organizerMainEl.hidden = false;
  currentRepo = null;
}

function switchRepoTab(tab) {
  activeRepoTab = tab;
  document.querySelectorAll(".repo-tab").forEach((btn) => {
    const isActive = btn.dataset.repoTab === tab;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll(".repo-tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== `repo-tab-${tab}`;
  });

  if (tab === "files" && !browseState) {
    browseState = { repo: currentRepo.id, ref: currentRepo.defaultBranch || "", path: "" };
    loadBrowsePath("");
  } else if (["issues", "wiki", "settings"].includes(tab)) {
    renderComingSoon(tab);
  }
}

document.getElementById("repo-view-back").addEventListener("click", closeRepoView);

document.querySelectorAll(".repo-tab").forEach((btn) => {
  btn.addEventListener("click", () => switchRepoTab(btn.dataset.repoTab));
});

// ---------------------------------------------------------------------------
// Sfoglia i file del repo (tab "File" della vista repo)
// ---------------------------------------------------------------------------

let browseState = null; // { repo, ref, path }

function renderBreadcrumb() {
  const repoName = browseState.repo.split("/")[1];
  const parts = browseState.path ? browseState.path.split("/") : [];
  let acc = "";
  const crumbs = [`<button type="button" class="crumb" data-crumb-path="">${escapeHtml(repoName)}</button>`];
  parts.forEach((part) => {
    acc = acc ? `${acc}/${part}` : part;
    crumbs.push(`<span class="crumb-sep">/</span><button type="button" class="crumb" data-crumb-path="${escapeHtml(acc)}">${escapeHtml(part)}</button>`);
  });
  browseBreadcrumbEl.innerHTML = crumbs.join("");
}

function fileIconFor(name) {
  return /readme/i.test(name) ? "book-open" : "file-code";
}

function renderBrowseEntries(entries) {
  if (!entries.length) {
    browseBodyEl.innerHTML = `<div class="tree-empty glass-panel"><p class="muted">Cartella vuota.</p></div>`;
    return;
  }
  browseBodyEl.innerHTML = `<ul class="tree-list" role="list">${entries.map(renderBrowseEntryRow).join("")}</ul>`;
}

function renderBrowseEntryRow(entry) {
  const icon = entry.type === "dir" ? DEFAULT_FOLDER_ICON : fileIconFor(entry.name);
  return `
    <li class="tree-item">
      <button type="button" class="tree-row browse-row" data-browse-path="${escapeHtml(entry.path)}" data-browse-type="${entry.type}">
        <span class="node-icon" style="--badge-bg:${colorBg(DEFAULT_COLOR)};--badge-ink:${colorInk(DEFAULT_COLOR)}">${svgIcon(icon)}</span>
        <span class="row-main"><span class="row-name">${escapeHtml(entry.name)}</span></span>
      </button>
    </li>`;
}

async function loadBrowsePath(path) {
  browseState.path = path;
  renderBreadcrumb();
  browseBodyEl.innerHTML = renderSkeleton();
  try {
    const params = new URLSearchParams({ repo: browseState.repo, path, ref: browseState.ref });
    const data = await apiGet(`/api/github/tree?${params}`);
    if (data.isFile) return loadBrowseFile(path);
    renderBrowseEntries(data.entries);
  } catch (err) {
    browseBodyEl.innerHTML = `<div class="tree-empty glass-panel"><p class="muted">${escapeHtml(err.message)}</p></div>`;
  }
}

async function loadBrowseFile(path) {
  browseState.path = path;
  renderBreadcrumb();
  browseBodyEl.innerHTML = renderSkeleton();
  try {
    const params = new URLSearchParams({ repo: browseState.repo, path, ref: browseState.ref });
    const data = await apiGet(`/api/github/file?${params}`);

    if (data.isBinary || data.tooLarge) {
      const message = data.isBinary ? "Anteprima non disponibile per questo tipo di file." : "File troppo grande per l'anteprima.";
      browseBodyEl.innerHTML = `
        <div class="tree-empty glass-panel">
          <p class="muted">${escapeHtml(message)}</p>
          <a class="btn btn-primary" href="${escapeHtml(data.htmlUrl)}" target="_blank" rel="noopener noreferrer">Apri su GitHub</a>
        </div>`;
      return;
    }

    const isMarkdown = /\.mdx?$/i.test(path);
    if (isMarkdown && window.marked && window.DOMPurify) {
      browseBodyEl.innerHTML = `<div class="glass-panel file-viewer">${window.DOMPurify.sanitize(window.marked.parse(data.content))}</div>`;
    } else {
      browseBodyEl.innerHTML = `<pre class="glass-panel code-viewer"><code>${escapeHtml(data.content)}</code></pre>`;
    }
  } catch (err) {
    browseBodyEl.innerHTML = `<div class="tree-empty glass-panel"><p class="muted">${escapeHtml(err.message)}</p></div>`;
  }
}

browseBodyEl.addEventListener("click", (e) => {
  const row = e.target.closest("[data-browse-path]");
  if (!row) return;
  if (row.dataset.browseType === "dir") loadBrowsePath(row.dataset.browsePath);
  else loadBrowseFile(row.dataset.browsePath);
});

browseBreadcrumbEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-crumb-path]");
  if (!btn) return;
  loadBrowsePath(btn.dataset.crumbPath);
});

// ---------------------------------------------------------------------------
// Modal: nuova cartella / rinomina / icona e colore / sposta
// ---------------------------------------------------------------------------

const styleModal = document.getElementById("style-modal");
setupModalDismiss(styleModal);

function buildIconGrid(selectedIcon) {
  return ICON_IDS.map(
    (id) => `<button type="button" class="icon-pick${id === selectedIcon ? " is-selected" : ""}" data-icon="${id}" aria-label="${id}">${svgIcon(id)}</button>`
  ).join("");
}

function buildColorRow(selectedColor) {
  return COLORS.map(
    (c) =>
      `<button type="button" class="color-pick${c.id === selectedColor ? " is-selected" : ""}" data-color="${c.id}" style="--swatch:${colorBg(c.id)}" aria-label="${c.id}"></button>`
  ).join("");
}

let styleTarget = null; // { nodeId, type }

// Per i repo, nodeId e' sempre il loro full_name GitHub (es. "Pigiazza/Foo"):
// non hanno un id proprio nell'albero, sono referenziati direttamente.
function openStyleModal(nodeId, type) {
  const currentIcon = type === "folder" ? tree.folders[nodeId]?.icon : tree.repoMeta[nodeId]?.icon || DEFAULT_REPO_ICON;
  const currentColor = type === "folder" ? tree.folders[nodeId]?.color : tree.repoMeta[nodeId]?.color || DEFAULT_COLOR;

  styleTarget = { nodeId, type };
  document.getElementById("style-modal-icons").innerHTML = buildIconGrid(currentIcon);
  document.getElementById("style-modal-colors").innerHTML = buildColorRow(currentColor);
  document.getElementById("style-modal-icons").dataset.selected = currentIcon;
  document.getElementById("style-modal-colors").dataset.selected = currentColor;

  openModal(styleModal);
}

document.getElementById("style-modal-icons").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-icon]");
  if (!btn) return;
  document.querySelectorAll("#style-modal-icons .icon-pick").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  document.getElementById("style-modal-icons").dataset.selected = btn.dataset.icon;
});

document.getElementById("style-modal-colors").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-color]");
  if (!btn) return;
  document.querySelectorAll("#style-modal-colors .color-pick").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  document.getElementById("style-modal-colors").dataset.selected = btn.dataset.color;
});

document.getElementById("style-modal-save").addEventListener("click", () => {
  const icon = document.getElementById("style-modal-icons").dataset.selected;
  const color = document.getElementById("style-modal-colors").dataset.selected;
  if (styleTarget.type === "folder") {
    tree.folders[styleTarget.nodeId].icon = icon;
    tree.folders[styleTarget.nodeId].color = color;
  } else {
    tree.repoMeta[styleTarget.nodeId] = { ...(tree.repoMeta[styleTarget.nodeId] || {}), icon, color };
  }
  closeModal(styleModal);
  render();
  scheduleSave(true);
});

// --- Rinomina cartella ---

const renameModal = document.getElementById("rename-modal");
setupModalDismiss(renameModal);
let renameTarget = null;

function openRenameModal(nodeId) {
  renameTarget = nodeId;
  const input = document.getElementById("rename-modal-input");
  input.value = tree.folders[nodeId]?.name || "";
  openModal(renameModal);
  input.focus();
  input.select();
}

document.getElementById("rename-modal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("rename-modal-input").value.trim();
  if (name && renameTarget) {
    tree.folders[renameTarget].name = name;
    closeModal(renameModal);
    render();
    scheduleSave(true);
  }
});

// --- Nuova cartella ---

const newFolderModal = document.getElementById("new-folder-modal");
setupModalDismiss(newFolderModal);

newFolderBtn.addEventListener("click", () => {
  document.getElementById("new-folder-modal-input").value = "";
  document.getElementById("new-folder-modal-icons").innerHTML = buildIconGrid(DEFAULT_FOLDER_ICON);
  document.getElementById("new-folder-modal-icons").dataset.selected = DEFAULT_FOLDER_ICON;
  document.getElementById("new-folder-modal-colors").innerHTML = buildColorRow(DEFAULT_COLOR);
  document.getElementById("new-folder-modal-colors").dataset.selected = DEFAULT_COLOR;
  openModal(newFolderModal);
  document.getElementById("new-folder-modal-input").focus();
});

document.getElementById("new-folder-modal-icons").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-icon]");
  if (!btn) return;
  document.querySelectorAll("#new-folder-modal-icons .icon-pick").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  document.getElementById("new-folder-modal-icons").dataset.selected = btn.dataset.icon;
});

document.getElementById("new-folder-modal-colors").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-color]");
  if (!btn) return;
  document.querySelectorAll("#new-folder-modal-colors .color-pick").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");
  document.getElementById("new-folder-modal-colors").dataset.selected = btn.dataset.color;
});

document.getElementById("new-folder-modal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("new-folder-modal-input").value.trim();
  if (!name) return;
  const icon = document.getElementById("new-folder-modal-icons").dataset.selected;
  const color = document.getElementById("new-folder-modal-colors").dataset.selected;
  createFolder(name, icon, color, "root");
  closeModal(newFolderModal);
  render();
  scheduleSave(true);
});

// --- Sposta in cartella ---

const moveModal = document.getElementById("move-modal");
setupModalDismiss(moveModal);
let moveTarget = null;

function openMoveModal(nodeId) {
  moveTarget = nodeId;
  const folders = allFoldersFlat().filter((f) => f.id !== nodeId && !isDescendantFolder(nodeId, f.id));
  document.getElementById("move-modal-list").innerHTML = `
    <button type="button" class="move-option" data-target="root">
      ${svgIcon("archive")} <span>Livello principale</span>
    </button>
    ${folders
      .map(
        (f) => `
      <button type="button" class="move-option" data-target="${f.id}" style="--depth:${f.depth}">
        ${svgIcon(tree.folders[f.id].icon)} <span>${escapeHtml(f.name)}</span>
      </button>`
      )
      .join("")}
  `;
  openModal(moveModal);
}

document.getElementById("move-modal-list").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-target]");
  if (!btn || !moveTarget) return;
  moveNode(moveTarget, btn.dataset.target);
  closeModal(moveModal);
  render();
  scheduleSave(true);
});

// ---------------------------------------------------------------------------
// Ricerca e refresh
// ---------------------------------------------------------------------------

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  render();
});

refreshBtn.addEventListener("click", loadAll);

// ---------------------------------------------------------------------------
// Avvio
// ---------------------------------------------------------------------------

loadAll();

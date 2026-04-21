@echo off
echo Lancement du backend...
start cmd /k "cd src/backend && node server.js"

echo Lancement du frontend...
start cmd /k "npm run dev"

echo Tout est lancé !

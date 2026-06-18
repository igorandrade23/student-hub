#!/usr/bin/env bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
cd /home/igor/Projects/tuctuc
pkill -9 -f "next-server" 2>/dev/null
pkill -9 -f "next/dist/bin/next" 2>/dev/null
sleep 2
rm -rf .next
NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next build 2>&1 | tail -30

#!/usr/bin/env bash
# ============================================================
# V3AM FOB — Restart Script
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[FOB] Restarting V3AM FOB..."

bash "${SCRIPT_DIR}/stop.sh"
sleep 2
bash "${SCRIPT_DIR}/start.sh" "$@"

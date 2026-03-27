#!/usr/bin/env bash
# ============================================================
# V3AM FOB — Stop Script
# Replaces STOP-ALL.bat
# ============================================================

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${CYAN}[FOB]${NC} $*"; }
ok()   { echo -e "${GREEN}[OK]${NC}  $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }

FOB_ROOT="${HOME}/fob"
PID_DIR="${FOB_ROOT}/run"

echo ""
log "Stopping V3AM FOB services..."

# ── Stop Launcher (which stops all child services) ────────────────────────

if [ -f "${PID_DIR}/launcher.pid" ]; then
  LAUNCHER_PID=$(cat "${PID_DIR}/launcher.pid")
  if kill -0 "${LAUNCHER_PID}" 2>/dev/null; then
    log "  Stopping Launcher (PID ${LAUNCHER_PID})..."
    kill -TERM "${LAUNCHER_PID}" 2>/dev/null || true
    sleep 1
    kill -KILL "${LAUNCHER_PID}" 2>/dev/null || true
    ok "  Launcher stopped"
  else
    warn "  Launcher PID ${LAUNCHER_PID} not running"
  fi
  rm -f "${PID_DIR}/launcher.pid"
else
  warn "  No launcher.pid found — trying killall approach"
fi

# ── Kill any remaining node processes using FOB ports ─────────────────────

FOB_PORTS=(9399 9303 9220 9210 8086 8100 11111 11112 11113 11114 10336 10333 8091 10337 10108 57775 57785 57790 9230 25565)

log "  Cleaning up FOB ports..."
for port in "${FOB_PORTS[@]}"; do
  # Use lsof to find processes on these ports
  pids=$(lsof -ti ":${port}" 2>/dev/null)
  if [ -n "${pids}" ]; then
    echo "${pids}" | xargs kill -KILL 2>/dev/null || true
    log "    Killed process(es) on :${port}"
  fi
done

# ── Stop llama.cpp server ─────────────────────────────────────────────────

if [ -f "${PID_DIR}/llama-server.pid" ]; then
  LLAMA_PID=$(cat "${PID_DIR}/llama-server.pid")
  if kill -0 "${LLAMA_PID}" 2>/dev/null; then
    log "  Stopping llama.cpp (PID ${LLAMA_PID})..."
    kill -TERM "${LLAMA_PID}" 2>/dev/null || true
    sleep 1
    kill -KILL "${LLAMA_PID}" 2>/dev/null || true
    ok "  llama.cpp stopped"
  fi
  rm -f "${PID_DIR}/llama-server.pid"
fi

# Also try by name as fallback
pkill -KILL -f "llama-server" 2>/dev/null || true

# ── Clean up remaining pid files ─────────────────────────────────────────

if [ -d "${PID_DIR}" ]; then
  for pidfile in "${PID_DIR}"/*.pid; do
    [ -f "${pidfile}" ] || continue
    pid=$(cat "${pidfile}")
    kill -KILL "${pid}" 2>/dev/null || true
    rm -f "${pidfile}"
  done
fi

echo ""
ok "All V3AM FOB services stopped."
echo ""

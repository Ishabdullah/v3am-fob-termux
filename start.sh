#!/usr/bin/env bash
# ============================================================
# V3AM FOB — Start Script
# Replaces Launcher2.bat / START-V3AMFOB.bat
#
# Usage:
#   bash start.sh [--no-llama]
#
# Options:
#   --no-llama    Skip starting llama.cpp server
#   --llama-only  Only start llama.cpp server
# ============================================================

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${CYAN}[FOB]${NC} $*"; }
ok()   { echo -e "${GREEN}[OK]${NC}  $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }

# ── Paths ──────────────────────────────────────────────────────────────────

FOB_ROOT="${HOME}/fob"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LLAMACPP_BIN="${HOME}/llama.cpp/build/bin/llama-server"
MODELS_DIR="${FOB_ROOT}/models"
PID_DIR="${FOB_ROOT}/run"
LOG_DIR="${FOB_ROOT}/logs"
LAUNCHER_JS="${SCRIPT_DIR}/lib/launcher.js"

START_LLAMA=true
LAUNCHER_ONLY=false

for arg in "$@"; do
  case $arg in
    --no-llama)    START_LLAMA=false ;;
    --llama-only)  LAUNCHER_ONLY=true ;;
  esac
done

mkdir -p "${PID_DIR}" "${LOG_DIR}"

# ── Check if already running ───────────────────────────────────────────────

if [ -f "${PID_DIR}/launcher.pid" ]; then
  EXISTING_PID=$(cat "${PID_DIR}/launcher.pid")
  if kill -0 "${EXISTING_PID}" 2>/dev/null; then
    warn "FOB Launcher already running (PID ${EXISTING_PID})"
    warn "Run 'bash stop.sh' first, or 'bash restart.sh'"
    exit 1
  else
    rm -f "${PID_DIR}/launcher.pid"
  fi
fi

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║   V3AM FOB — Starting Services           ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

# ── Start llama.cpp server ────────────────────────────────────────────────

if $START_LLAMA; then
  if [ ! -f "${LLAMACPP_BIN}" ]; then
    warn "llama.cpp server not found at ${LLAMACPP_BIN}"
    warn "Run 'bash setup.sh' first, or use --no-llama flag"
  else
    # Find a model file
    MODEL_FILE=""
    if [ -d "${MODELS_DIR}" ]; then
      MODEL_FILE=$(find "${MODELS_DIR}" -name "*.gguf" | head -1)
    fi

    if [ -z "${MODEL_FILE}" ]; then
      warn "No GGUF model found in ${MODELS_DIR}"
      warn "Download a model and place it there, or edit this script"
    else
      log "Starting llama.cpp server..."
      log "  Model: $(basename "${MODEL_FILE}")"

      # Kill any existing llama-server
      pkill -f "llama-server" 2>/dev/null || true
      sleep 0.5

      nohup "${LLAMACPP_BIN}" \
        --model "${MODEL_FILE}" \
        --host 127.0.0.1 \
        --port 8080 \
        --ctx-size 4096 \
        --threads $(nproc) \
        --n-gpu-layers 0 \
        > "${LOG_DIR}/llama-server.log" 2>&1 &

      LLAMA_PID=$!
      echo "${LLAMA_PID}" > "${PID_DIR}/llama-server.pid"
      ok "llama.cpp started (PID ${LLAMA_PID}) → http://127.0.0.1:8080"

      # Wait for llama.cpp to be ready
      log "Waiting for llama.cpp to load model (may take 30-60s)..."
      for i in $(seq 1 30); do
        sleep 2
        if curl -s "http://127.0.0.1:8080/health" 2>/dev/null | grep -q "ok\|loading"; then
          ok "llama.cpp ready"
          break
        fi
        printf "."
      done
      echo ""
    fi
  fi
fi

if $LAUNCHER_ONLY; then
  ok "llama.cpp started. Done (--llama-only mode)."
  exit 0
fi

# ── Start FOB Launcher (manages all services) ─────────────────────────────

if [ ! -f "${LAUNCHER_JS}" ]; then
  echo -e "${RED}[ERR]${NC} Launcher not found: ${LAUNCHER_JS}"
  echo "  Make sure you're running from the v3am-fob-termux directory"
  exit 1
fi

# Install deps if needed
if [ ! -d "${SCRIPT_DIR}/node_modules" ]; then
  log "Installing Node.js dependencies..."
  cd "${SCRIPT_DIR}" && npm install --silent
fi

log "Starting V3AM FOB Launcher..."

export FOB_ROOT="${FOB_ROOT}"
export SERVICES_ROOT="${FOB_ROOT}/adir/new211adir/TANDR-2026-02-11"
export FOB_CONFIG="${FOB_ROOT}/config/fob-config.json"

nohup node "${LAUNCHER_JS}" \
  > "${LOG_DIR}/launcher.log" 2>&1 &

LAUNCHER_PID=$!
echo "${LAUNCHER_PID}" > "${PID_DIR}/launcher.pid"
ok "Launcher started (PID ${LAUNCHER_PID})"

# ── Health check ──────────────────────────────────────────────────────────

log "Waiting for launcher API to be ready..."
for i in $(seq 1 15); do
  sleep 1
  if curl -s "http://127.0.0.1:9399/status" 2>/dev/null | grep -q '"ok"'; then
    ok "Launcher API ready → http://127.0.0.1:9399"
    break
  fi
  printf "."
done
echo ""

# ── Summary ───────────────────────────────────────────────────────────────

echo ""
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║   V3AM FOB is running!                               ║"
echo "  ╠══════════════════════════════════════════════════════╣"
echo "  ║   Dashboard:  http://127.0.0.1:9399/                 ║"
echo "  ║   API:        http://127.0.0.1:9399/status           ║"
echo "  ║   llama.cpp:  http://127.0.0.1:8080/health           ║"
echo "  ╠══════════════════════════════════════════════════════╣"
echo "  ║   Services:                                          ║"

# Read and display service status
if curl -s "http://127.0.0.1:9399/status" 2>/dev/null > /tmp/fob-status.json; then
  # jq parsing
  if command -v jq &>/dev/null; then
    jq -r '.services[] | "  ║     \(.name) (\(.id)) → :\(.port)       \(.status)"' \
      /tmp/fob-status.json 2>/dev/null | head -20 | \
      while IFS= read -r line; do printf "  %-56s ║\n" "${line}"; done
  fi
fi

echo "  ╠══════════════════════════════════════════════════════╣"
echo "  ║   Logs:  ${LOG_DIR}/launcher.log           "
echo "  ║   PIDs:  ${PID_DIR}/launcher.pid           "
echo "  ║   Stop:  bash stop.sh                                ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo ""

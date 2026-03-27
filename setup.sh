#!/usr/bin/env bash
# ============================================================
# V3AM FOB — Termux Setup Script
# One-shot installer for Termux/Android
#
# Usage:
#   bash setup.sh
#
# What this does:
#   1. Update Termux packages
#   2. Install: nodejs-lts, git, cmake, make, clang, python
#   3. Clone and build llama.cpp from source
#   4. Download a default GGUF model
#   5. Install npm dependencies for all services
#   6. Create the FOB directory structure
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${CYAN}[FOB]${NC} $*"; }
ok()   { echo -e "${GREEN}[OK]${NC}  $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
err()  { echo -e "${RED}[ERR]${NC}  $*"; }

# ── Paths ──────────────────────────────────────────────────────────────────

FOB_ROOT="${HOME}/fob"
LLAMACPP_DIR="${HOME}/llama.cpp"
MODELS_DIR="${HOME}/fob/models"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log "V3AM FOB Termux Setup"
log "FOB root:    ${FOB_ROOT}"
log "llama.cpp:   ${LLAMACPP_DIR}"
log ""

# ── Step 1: Update packages ────────────────────────────────────────────────

log "Step 1/6: Updating Termux packages..."
pkg update -y && pkg upgrade -y 2>/dev/null || warn "Package update had warnings (continuing)"
ok "Packages updated"

# ── Step 2: Install dependencies ──────────────────────────────────────────

log "Step 2/6: Installing dependencies..."

PACKAGES=(
  nodejs-lts
  git
  cmake
  make
  clang
  python
  curl
  wget
  jq
)

for pkg in "${PACKAGES[@]}"; do
  if ! command -v "${pkg}" &>/dev/null 2>&1; then
    log "  Installing ${pkg}..."
    pkg install -y "${pkg}" || warn "  Failed to install ${pkg}"
  else
    log "  ${pkg} already installed"
  fi
done

ok "Dependencies installed"

# ── Step 3: Build llama.cpp ────────────────────────────────────────────────

log "Step 3/6: Building llama.cpp..."

if [ -d "${LLAMACPP_DIR}/build" ] && [ -f "${LLAMACPP_DIR}/build/bin/llama-server" ]; then
  ok "llama.cpp already built at ${LLAMACPP_DIR}"
else
  if [ ! -d "${LLAMACPP_DIR}" ]; then
    log "  Cloning llama.cpp..."
    git clone --depth 1 https://github.com/ggerganov/llama.cpp.git "${LLAMACPP_DIR}"
  else
    log "  llama.cpp already cloned, updating..."
    cd "${LLAMACPP_DIR}" && git pull
  fi

  log "  Building (this takes 5-15 minutes on Termux)..."
  cd "${LLAMACPP_DIR}"
  mkdir -p build
  cd build

  # Build with basic options (no GPU on most Android)
  cmake .. \
    -DCMAKE_BUILD_TYPE=Release \
    -DLLAMA_CURL=OFF \
    -DLLAMA_BUILD_TESTS=OFF \
    -DLLAMA_BUILD_EXAMPLES=ON \
    2>&1 | tail -5

  cmake --build . --config Release -j $(nproc) 2>&1 | tail -10

  if [ -f "bin/llama-server" ]; then
    ok "llama.cpp built successfully → ${LLAMACPP_DIR}/build/bin/llama-server"
  else
    warn "llama-server not found — build may have failed. Check manually."
    warn "Continuing setup, but start.sh will not be able to start llama.cpp"
  fi
fi

# ── Step 4: Download default model ────────────────────────────────────────

log "Step 4/6: Checking for default LLM model..."

mkdir -p "${MODELS_DIR}"

MODEL_FILE="${MODELS_DIR}/Qwen2.5-7B-Instruct-Q4_K_M.gguf"
MODEL_URL="https://huggingface.co/Qwen/Qwen2.5-7B-Instruct-GGUF/resolve/main/qwen2.5-7b-instruct-q4_k_m.gguf"

if [ -f "${MODEL_FILE}" ]; then
  ok "Model already exists: ${MODEL_FILE}"
else
  log "  Downloading Qwen2.5-7B-Q4_K_M (~4.7GB)..."
  log "  This will take a while on slow connections."
  log "  You can Ctrl+C and manually place a GGUF file in: ${MODELS_DIR}"
  echo ""

  if command -v wget &>/dev/null; then
    wget -c --progress=bar:force:noscroll -O "${MODEL_FILE}" "${MODEL_URL}" || {
      warn "Download failed. Skipping model download."
      warn "Place any GGUF model in: ${MODELS_DIR}"
      rm -f "${MODEL_FILE}"
    }
  elif command -v curl &>/dev/null; then
    curl -L --progress-bar -C - -o "${MODEL_FILE}" "${MODEL_URL}" || {
      warn "Download failed. Skipping model download."
      rm -f "${MODEL_FILE}"
    }
  else
    warn "Neither wget nor curl found — cannot download model"
  fi

  if [ -f "${MODEL_FILE}" ]; then
    ok "Model downloaded: ${MODEL_FILE}"
  fi
fi

# ── Step 5: Create FOB directory structure ─────────────────────────────────

log "Step 5/6: Creating FOB directory structure..."

mkdir -p \
  "${FOB_ROOT}/config" \
  "${FOB_ROOT}/models" \
  "${FOB_ROOT}/run" \
  "${FOB_ROOT}/logs" \
  "${FOB_ROOT}/adir/new211adir/TANDR-2026-02-11/adirhub/TOOLS" \
  "${FOB_ROOT}/adir/new211adir/TANDR-2026-02-11/apps"

# Link the v3am-fob-termux project into FOB_ROOT
# The launcher expects things under $HOME/fob/
if [ -f "${SCRIPT_DIR}/lib/launcher.js" ]; then
  log "  Symlinking project into ${FOB_ROOT}..."
  # Core infrastructure
  ln -sf "${SCRIPT_DIR}/lib"       "${FOB_ROOT}/lib"
  ln -sf "${SCRIPT_DIR}/dashboard" "${FOB_ROOT}/dashboard"
  ln -sf "${SCRIPT_DIR}/package.json" "${FOB_ROOT}/package.json"
  ln -sf "${SCRIPT_DIR}/fob-server.js" "${FOB_ROOT}/fob-server.js"
  
  # Service directories — link adir and apps into the path the launcher expects
  # Launcher expects: ${HOME}/fob/adir/new211adir/TANDR-2026-02-11/{adirhub,apps}
  SROOT="${FOB_ROOT}/adir/new211adir/TANDR-2026-02-11"
  mkdir -p "${SROOT}"
  ln -sf "${SCRIPT_DIR}/adir/new211adir/TANDR-2026-02-11/adirhub" "${SROOT}/adirhub" 2>/dev/null || true
  ln -sf "${SCRIPT_DIR}/apps" "${SROOT}/apps" 2>/dev/null || true
  ok "Project symlinked into ${FOB_ROOT}"
fi

# Copy fob-config if not already present
if [ ! -f "${FOB_ROOT}/config/fob-config.json" ] && [ -f "${SCRIPT_DIR}/config/fob-config.json" ]; then
  cp "${SCRIPT_DIR}/config/fob-config.json" "${FOB_ROOT}/config/fob-config.json"
  ok "Copied fob-config.json"
fi

ok "Directory structure created"

# ── Step 6: Install Node.js dependencies ──────────────────────────────────

log "Step 6/6: Installing Node.js dependencies..."

# Main package
cd "${SCRIPT_DIR}"
if [ -f "package.json" ]; then
  log "  npm install in ${SCRIPT_DIR}..."
  npm install --silent
  ok "  Root dependencies installed"
fi

# Service directories (search within the repo, not the symlinks)
find "${SCRIPT_DIR}/adir" "${SCRIPT_DIR}/apps" -name "package.json" 2>/dev/null \
  -not -path "*/node_modules/*" | while read pkgjson; do
  svcdir="$(dirname "${pkgjson}")"
  if [ -f "${svcdir}/server.js" ] && [ ! -d "${svcdir}/node_modules" ]; then
    log "  npm install in ${svcdir}..."
    cd "${svcdir}" && npm install --silent && cd "${SCRIPT_DIR}" || true
  fi
done

ok "Node.js dependencies installed"

# ── Done ──────────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   V3AM FOB Setup Complete!               ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo "  Next steps:"
echo "    1. bash start.sh          # Start all services"
echo "    2. Open browser →         http://127.0.0.1:9399/"
echo ""
echo "  Model location: ${MODELS_DIR}"
echo "  Config:         ${FOB_ROOT}/config/fob-config.json"
echo ""

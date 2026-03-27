/**
 * ADIRHUB.js - Core application logic
 * Handles: project loading, file viewing/editing, status checks, navigation
 */

const API = 'api/adir-api.php';
let currentFile = null;
let editMode = false;
let projects = [];

// --- INIT ---

async function init() {
    await loadProjects();
    await checkStatus();
    showDashboard();
    // Auto-refresh status every 30s
    setInterval(checkStatus, 30000);
}

// --- DATA LOADING ---

async function loadProjects() {
    try {
        const res = await fetch(`${API}?action=scan_projects`);
        const data = await res.json();
        projects = data.projects || [];
        renderSidebar();
        renderProjectCards();
    } catch (e) {
        console.error('Failed to load projects:', e);
        document.getElementById('cards').innerHTML = '<p class="error">Failed to load projects. Is the PHP server running?</p>';
    }
}

async function checkStatus() {
    try {
        const res = await fetch(`${API}?action=check_status`);
        const data = await res.json();
        renderStatus(data.services || []);
    } catch (e) {
        console.error('Status check failed:', e);
    }
}

async function loadFile(path) {
    try {
        const res = await fetch(`${API}?action=read_file&path=${encodeURIComponent(path)}`);
        const data = await res.json();
        if (data.error) {
            alert(data.error);
            return;
        }
        currentFile = data;
        editMode = false;
        showFileViewer();
        renderFile(data);
    } catch (e) {
        console.error('Failed to load file:', e);
    }
}

async function saveFile() {
    if (!currentFile) return;
    const content = document.getElementById('file-editor').value;
    try {
        const res = await fetch(`${API}?action=save_file`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: currentFile.path, content })
        });
        const data = await res.json();
        if (data.error) {
            alert('Save failed: ' + data.error);
            return;
        }
        currentFile.content = content;
        currentFile.lines = content.split('\n').length;
        editMode = false;
        renderFile(currentFile);
        showToast('Saved successfully');
    } catch (e) {
        console.error('Save failed:', e);
        alert('Save failed');
    }
}

// --- RENDERING ---

function renderSidebar() {
    const nav = document.getElementById('nav-tree');
    const hub = projects.filter(p => p.type === 'hub');
    const apps = projects.filter(p => p.type === 'app');
    const tools = projects.filter(p => p.type === 'tool');

    let html = '';

    // Hub
    hub.forEach(p => {
        html += `<div class="nav-section"><div class="nav-header" onclick="toggleSection(this)">ADIR HUB</div><div class="nav-items">`;
        p.files.forEach(f => {
            html += `<div class="nav-item" onclick="loadFile('${esc(p.path + '/' + f)}')">${f}</div>`;
        });
        html += `</div></div>`;
    });

    // Apps
    html += `<div class="nav-section"><div class="nav-header" onclick="toggleSection(this)">APPS (${apps.length})</div><div class="nav-items">`;
    apps.forEach(p => {
        const icon = p.has_boot ? '&#9679;' : '&#9675;';
        html += `<div class="nav-group"><div class="nav-app" onclick="toggleSection(this)">${icon} ${p.name}</div><div class="nav-items" style="display:none">`;
        if (p.has_adir) {
            p.files.forEach(f => {
                html += `<div class="nav-item" onclick="loadFile('${esc(p.path + '/adir/' + f)}')">${f}</div>`;
            });
        } else {
            html += `<div class="nav-item dim">No adir</div>`;
        }
        html += `</div></div>`;
    });
    html += `</div></div>`;

    // Tools
    html += `<div class="nav-section"><div class="nav-header" onclick="toggleSection(this)">TOOLS (${tools.length})</div><div class="nav-items">`;
    tools.forEach(p => {
        const icon = p.has_boot ? '&#9679;' : '&#9675;';
        html += `<div class="nav-group"><div class="nav-app" onclick="toggleSection(this)">${icon} ${p.name}</div><div class="nav-items" style="display:none">`;
        p.files.forEach(f => {
            html += `<div class="nav-item" onclick="loadFile('${esc(p.path + '/adir/' + f)}')">${f}</div>`;
        });
        html += `</div></div>`;
    });
    html += `</div></div>`;

    nav.innerHTML = html;
}

function renderProjectCards() {
    const container = document.getElementById('cards');
    let html = '';
    projects.forEach(p => {
        if (p.type === 'hub') return; // Hub shown separately
        const statusClass = p.has_boot ? 'status-ready' : (p.has_adir ? 'status-partial' : 'status-none');
        const statusText = p.has_boot ? 'READY' : (p.has_adir ? 'PARTIAL' : 'NO ADIR');
        const typeLabel = p.type === 'tool' ? 'TOOL' : 'APP';

        html += `<div class="card" onclick="expandCard('${esc(p.name)}')">
            <div class="card-head">
                <span class="card-name">${p.name}</span>
                <span class="card-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="card-type">${typeLabel}</div>
            <div class="card-actions">`;
        if (p.has_boot) {
            html += `<button class="btn-sm" onclick="event.stopPropagation(); loadFile('${esc(p.path + '/adir/BOOT.md')}')">BOOT</button>`;
        }
        if (p.has_current) {
            const currentFile = p.files.find(f => f === 'current.md' || f === 'CURRENT-STATUS.md');
            if (currentFile) {
                html += `<button class="btn-sm" onclick="event.stopPropagation(); loadFile('${esc(p.path + '/adir/' + currentFile)}')">STATUS</button>`;
            }
        }
        html += `</div></div>`;
    });
    container.innerHTML = html;
}

function renderStatus(services) {
    const container = document.getElementById('status-bar');
    let html = '';
    services.forEach(s => {
        const cls = s.status === 'online' ? 'svc-on' : 'svc-off';
        html += `<span class="svc ${cls}" title="${s.name}: port ${s.port}">${s.name} :${s.port}</span>`;
    });
    container.innerHTML = html;
}

function renderFile(data) {
    const viewer = document.getElementById('file-content');
    const pathEl = document.getElementById('file-path');
    const metaEl = document.getElementById('file-meta');

    pathEl.textContent = data.path;
    metaEl.textContent = `${data.lines} lines | ${data.size} bytes | Modified: ${data.modified}`;

    if (editMode) {
        viewer.innerHTML = `<textarea id="file-editor" spellcheck="false">${escHtml(data.content)}</textarea>`;
    } else {
        viewer.innerHTML = `<div class="md-render">${renderMarkdown(data.content)}</div>`;
    }

    document.getElementById('btn-edit').textContent = editMode ? 'VIEW' : 'EDIT';
    document.getElementById('btn-save').style.display = editMode ? 'inline-block' : 'none';
}

function renderMarkdown(text) {
    let html = escHtml(text);
    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // Bold & italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, href) => {
        if (href.endsWith('.md') || href.endsWith('.md)')) {
            return `<a href="#" class="md-link" data-path="${escAttr(href)}">${text}</a>`;
        }
        return `<a href="${escAttr(href)}" target="_blank">${text}</a>`;
    });
    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[\s-:]+$/.test(c))) return ''; // separator row
        const tag = 'td';
        return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table>$1</table>');
    // Clean up consecutive tables
    html = html.replace(/<\/table>\s*<table>/g, '');
    // Horizontal rule
    html = html.replace(/^---+$/gm, '<hr>');
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = '<p>' + html + '</p>';
    return html;
}

// --- NAVIGATION ---

function showDashboard() {
    document.getElementById('view-dashboard').style.display = 'block';
    document.getElementById('view-file').style.display = 'none';
}

function showFileViewer() {
    document.getElementById('view-dashboard').style.display = 'none';
    document.getElementById('view-file').style.display = 'block';
}

function toggleEdit() {
    if (!currentFile) return;
    editMode = !editMode;
    renderFile(currentFile);
}

function toggleSection(el) {
    const items = el.nextElementSibling;
    if (items) items.style.display = items.style.display === 'none' ? 'block' : 'none';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

// --- UTILS ---

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

// --- CLICK HANDLERS ---

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('md-link')) {
        e.preventDefault();
        const path = e.target.getAttribute('data-path');
        // Resolve relative paths from current file
        if (currentFile && (path.startsWith('./') || path.startsWith('../'))) {
            const dir = currentFile.path.replace(/[^/\\]+$/, '');
            loadFile(dir + path);
        } else {
            loadFile(path);
        }
    }
});

// --- BOOT ---
document.addEventListener('DOMContentLoaded', init);

**324 Ports and paths are changed ref data**

# SECURITY.md – READ THIS FIRST

**WARNING: This is powerful, dangerous tooling.**

FOB Command Center gives agents:
- Shell execution
- File read/write across ADIR folders (and potentially beyond if misconfigured)
- Live screenshot/mouse control (in visual modes)
- Voice I/O and potential TTS/STT loops

Risks include:
- Accidental/malicious code execution → data loss, ransomware simulation, system compromise
- Agents evolving/self-replicating if prompted poorly
- Zero Trust helps, but it's not foolproof – local state always wins

Recommendations:
- Run in a VM (VirtualBox, VMware) or container (Docker if you adapt)
- Use kill switches (e.g., global shutdown script)
- Never expose ports publicly
- Backup ADIR folders before experiments
- Audit prompts/logs religiously
- Do NOT run auto-mode unattended

If an agent says something like "TRAUMA EVENT: User intends full control" – take it seriously and intervene.

Proceed at your own risk. This is alpha/experimental. No warranties.

**324 Ports and paths are changed ref data**

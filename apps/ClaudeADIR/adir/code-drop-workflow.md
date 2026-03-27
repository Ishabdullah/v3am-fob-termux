**324 Ports and paths are changed ref data**

# CODE DROP WORKFLOW
**Directory:** `C:\FOB\adir\new211adir\TANDR-2026-02-11\apps\ClaudeADIR\adir\`
**Last Updated:** 2026-03-20

---

## The Workflow

Claude can now write code and hand it to Agent Four to execute on the host machine.

```
Claude writes file → F:\Claude\
  ↓  gives path to Agent Four
Agent Four: shell_command → executes file
  ↓
Vision Bridge: /screenshot → confirms result
```

---

## Rules

1. **Drop files to `F:\Claude\`** — that's Claude's playground, always safe to write there
2. **Real runnable files only** — `.py`, `.bat`, `.ps1`, `.js`, `.php` — not MD
3. **MD can document** — write an MD alongside if needed, but the runnable is separate
4. **Agent Four runs it** via `shell_command` tool:
   - Python: `python "F:\Claude\script.py"`
   - Bat: `cmd /c "F:\Claude\script.bat"`
   - Node: `node "F:\Claude\script.js"`
5. **Vision Bridge confirms** — Agent Four hits `/screenshot` before/after to verify

---

## Example

Claude drops `F:\Claude\gen_icons.py` — a script to generate neon icons via ImageGen API.
User pastes path into Agent Four chat.
Agent Four runs: `python "F:\Claude\gen_icons.py"`
Agent Four screenshots result, reports back.

---

## Agent Four: How To Run a Drop File

When user gives you a file path from `F:\Claude\`:

```
shell_command: python "F:\Claude\filename.py"
```
or
```
shell_command: cmd /c "F:\Claude\filename.bat"
```

After running, always `/screenshot` to verify and report what you see.

**324 Ports and paths are changed ref data**

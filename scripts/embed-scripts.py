"""Refresh inline scripts for reliable double-click use; Python standard library only."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1] / 'dist'
page = root / 'index.html'
html = page.read_text()
for name in ('app.js', 'planner-geometry.js', 'planner.js'):
    source = (root / name).read_text().replace('</script', '<\\/script')
    inline = f'<script data-source="{name}">\n{source}\n</script>'
    pattern = rf'<script (?:src="{re.escape(name)}"|data-source="{re.escape(name)}")[^>]*>.*?</script>'
    html, count = re.subn(pattern, lambda _: inline, html, flags=re.S)
    if count != 1:
        raise ValueError(f'Expected one script for {name}, found {count}')
page.write_text(html)

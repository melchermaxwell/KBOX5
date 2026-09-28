"""Refresh inline scripts for reliable double-click use; Python standard library only."""
from pathlib import Path
import re
import base64
root = Path(__file__).resolve().parents[1] / 'dist'
page = root / 'index.html'
html = page.read_text()
for name in ('app.js', 'planner-geometry.js', 'planner-share.js', 'planner-3d.js', 'planner.js'):
    source = (root / name).read_text().replace('</script', '<\\/script')
    if name == 'planner.js':
        # Self-contained SVG previews can render/export even when opened via file://.
        hero = base64.b64encode((root / 'assets/hangars.jpeg').read_bytes()).decode('ascii')
        source = source.replace('__SHARE_HERO_DATA__', 'data:image/jpeg;base64,' + hero)
    inline = f'<script data-source="{name}">\n{source}\n</script>'
    pattern = rf'<script (?:src="{re.escape(name)}"|data-source="{re.escape(name)}")[^>]*>.*?</script>'
    html, count = re.subn(pattern, lambda _: inline, html, flags=re.S)
    if count != 1:
        raise ValueError(f'Expected one script for {name}, found {count}')
page.write_text(html)

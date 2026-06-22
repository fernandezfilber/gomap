import os

file_path = 'backend/src/app.js'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if "loadRoute('/api/redes', './routes/red.routes');" in line:
        new_lines.append("loadRoute('/api/admin', './routes/admin.routes');\n")

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

lines = []
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'Media Coverage' in line:
        pass
    
    # Check if this line is the span
    if '<span className="text-secondary font-bold text-sm uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full mb-3 inline-block">News</span>' in line:
        continue # Skip the pill line

    new_lines.append(line)
    
    # Check if we just added the h2 closing tag
    if 'Media Coverage' in lines[i-1] and '</h2>' in line:
        # We just added the closing tag of h2, add our line now
        # Match indent
        indent = len(line) - len(line.lstrip())
        new_lines.append(' ' * (indent+2) + '<div className="w-16 h-1 mt-6 mx-auto bg-primary rounded-full"></div>\n')

with open('app/page.tsx', 'w') as f:
    f.writelines(new_lines)


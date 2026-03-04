lines = []
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'w-16 h-1 mt-6 mx-auto bg-primary rounded-full' in line:
        lines[i] = line.replace('w-16 h-1', 'mx-auto w-[240px] max-w-[60%] h-[5px]')

with open('app/page.tsx', 'w') as f:
    f.writelines(lines)


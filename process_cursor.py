from PIL import Image
import numpy as np

# Load image
img = Image.open('public/cursor-raw.png').convert('RGBA')
arr = np.array(img)

r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
# Outline is black
is_dark = (r < 100) & (g < 100) & (b < 100)

height, width = arr.shape[:2]
visited = np.zeros((height, width), dtype=bool)

# BFS from borders
queue = []
for x in range(width):
    queue.append((0, x))
    queue.append((height-1, x))
for y in range(height):
    queue.append((y, 0))
    queue.append((y, width-1))

while queue:
    y, x = queue.pop(0)
    if y < 0 or y >= height or x < 0 or x >= width:
        continue
    if visited[y, x] or is_dark[y, x]:
        continue
    
    visited[y, x] = True
    arr[y, x, 3] = 0 # set transparent
    
    queue.append((y+1, x))
    queue.append((y-1, x))
    queue.append((y, x+1))
    queue.append((y, x-1))

out = Image.fromarray(arr)
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

out.thumbnail((48, 48), Image.Resampling.LANCZOS)
out.save('public/cursor.png')
print("Processed and saved public/cursor.png")

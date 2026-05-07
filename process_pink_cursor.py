from PIL import Image
import numpy as np

# Load image
img = Image.open('public/cursor-pink-raw.png').convert('RGBA')
arr = np.array(img)

r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
# The background is white (or very close to it)
# We consider anything bright as background
# Wait, let's just make pure white or close to white transparent.
# Since it's a solid background, we can do a BFS from the edges like before.
is_border = (r < 200) | (g < 200) | (b < 200) # pink and brown are both not white

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

# Avoid duplicate start nodes
queue = list(set(queue))

while queue:
    y, x = queue.pop(0)
    if visited[y, x] or is_border[y, x]:
        continue
    
    visited[y, x] = True
    arr[y, x, 3] = 0 # set transparent
    
    if y + 1 < height: queue.append((y+1, x))
    if y - 1 >= 0: queue.append((y-1, x))
    if x + 1 < width: queue.append((y, x+1))
    if x - 1 >= 0: queue.append((y, x-1))

out = Image.fromarray(arr)
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

# Resize to max 40x40. Pixel art should probably use NEAREST to stay sharp,
# but since it might be a scaled up screenshot, LANCZOS might soften it, or NEAREST is better.
# Let's see how it looks. Since it's a screenshot, it already has aliased edges.
out.thumbnail((28, 28), Image.Resampling.LANCZOS)
out.save('public/cursor.png')
print("Processed and saved public/cursor.png")

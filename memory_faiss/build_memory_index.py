import json
import faiss
import numpy as np

with open("../memoryStore.json", "r") as f:
    memories = json.load(f)

print("Total Memories:", len(memories))

embeddings = []

for item in memories:
    embeddings.append(item["embedding"])

print("Embeddings Loaded:", len(embeddings))

embeddings = np.array(
    embeddings,
    dtype=np.float32
)

print(embeddings.shape)

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

print("Memory Index Created")

try:
    index.add(embeddings)

    print("Vectors Added:", index.ntotal)

    faiss.write_index(
        index,
        "memory_index.bin"
    )

    print("Memory Index Saved")

except Exception as e:
    print(e)
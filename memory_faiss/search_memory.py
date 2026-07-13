import faiss
import json
import numpy as np
import sys
import os

# Current directory (memory_faiss/)
current_dir = os.path.dirname(
    os.path.abspath(__file__)
)

# Load Memory FAISS Index
index_path = os.path.join(
    current_dir,
    "memory_index.bin"
)

index = faiss.read_index(
    index_path
)

# Read embedding from Node.js
input_data = json.loads(
    sys.stdin.read()
)

query_embedding = np.array(
    [input_data["embedding"]],
    dtype=np.float32
)

# Search Top 5 Memories
distances, indices = index.search(
    query_embedding,
    5
)

result = {

    "indices":
        indices[0].tolist(),

    "distances":
        distances[0].tolist()

}

print(json.dumps(result))
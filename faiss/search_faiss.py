import faiss
import json
import numpy as np
import sys
import os

# Current directory (faiss/)
current_dir = os.path.dirname(
    os.path.abspath(__file__)
)

# Load FAISS index
index_path = os.path.join(
    current_dir,
    "faiss_index.bin"
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

# Search Top 10
distances, indices = index.search(
    query_embedding,
    10
)

result = {

    "indices":
        indices[0].tolist(),

    "distances":
        distances[0].tolist()

}

print(json.dumps(result))
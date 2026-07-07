from sentence_transformers import CrossEncoder
import json
import sys

# Load model once
model = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

# Read JSON from stdin
input_data = json.loads(
    sys.stdin.read()
)

query = input_data["query"]

documents = input_data["documents"]

pairs = [

    (query, doc["chunk"])

    for doc in documents

]

scores = model.predict(pairs)

results = []

for doc, score in zip(documents, scores):

    results.append({

        "source":
            doc["source"],

        "chunk":
            doc["chunk"],

        "distance":
            doc["distance"],

        "rerankScore":
            float(score)

    })

results.sort(

    key=lambda x: x["rerankScore"],

    reverse=True

)

print(json.dumps(results))
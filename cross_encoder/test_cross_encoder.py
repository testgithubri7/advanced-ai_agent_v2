from sentence_transformers import CrossEncoder

# Load model
model = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

query = "leave policy"

chunks = [

    "Employees receive 25 days of paid leave per year.",

    "Notice period is 60 days.",

    "Insurance covers employees and dependents.",

    "Leave requests must be approved by the manager."

]

pairs = [

    (query, chunk)

    for chunk in chunks

]

scores = model.predict(pairs)

results = []

for chunk, score in zip(chunks, scores):

    results.append({

        "chunk": chunk,

        "score": float(score)

    })

results.sort(

    key=lambda x: x["score"],

    reverse=True

)

print("\nCross Encoder Results:\n")

for item in results:

    print(f"Score: {item['score']:.4f}")

    print(item["chunk"])

    print("-" * 50)
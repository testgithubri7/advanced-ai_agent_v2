function executionScheduler(steps) {

    const rounds = [];

    const completed = new Set();

    while (completed.size < steps.length) {

        const currentRound = [];

        for (const step of steps) {

            // already executed
            if (completed.has(step.id))
                continue;

            const ready =
                step.dependsOn.every(id =>
                    completed.has(id)
                );

            if (ready) {
                currentRound.push(step);
            }

        }

        // Detect invalid dependency graph
        if (currentRound.length === 0) {

            throw new Error(
                "Circular or invalid task dependencies detected."
            );

        }

        rounds.push(currentRound);

        for (const step of currentRound) {
            completed.add(step.id);
        }

    }

    return rounds;

}

module.exports = executionScheduler;
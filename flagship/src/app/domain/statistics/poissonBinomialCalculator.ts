
export class PoissonBinomialCalculator {

    public probabilityOfAtLeastNSuccesses(probabilities: number[], successes: number) : number {
        if (!probabilities.length || successes > probabilities.length) {
            return 0;
        }

        // At least N successes = 1 - P(N-1) - ... - P(0)
        let probability = 1;
        for (let i = successes - 1; i >= 0; i--) {
            probability -= this.probabilityOfSuccess(probabilities, i);
        }
        // let probability = 0;
        // for (let i = successes; i <= probabilities.length; i++) {
        //     probability += this.probabilityOfSuccess(probabilities, i);
        // }
        return probability;
    }

    private computedProbabilities: { [successes: number] : number } = {};
    public probabilityOfSuccess(probabilities: number[], successes: number): number {
        // See https://math.stackexchange.com/a/3347002/689695 for solution
        // P(x = 0) = product[1, n] of (1 - p_i)
        // k = successes, n = length of probabilities (dice count)
        // P(x = k) = 1/k * (sum[i=1 to k] of ((-1 ** i - 1) * P(k - i))
        //            * (sum[j=1 to n] of (p_j / (1 - p_j)) ** i)
        if (!probabilities.length || successes > probabilities.length) {
            return 0; // impossible to get more than N successes out of N rolls
        }
        if (this.computedProbabilities[successes]) {
            return this.computedProbabilities[successes];
        }

        if (successes == 0) {
            let probability: number = 1;
            for (const p of probabilities) {
                probability = probability * (1 - p);
            }
            this.computedProbabilities[0] = probability;
        } else {
            let probability: number = 0;
            for (let i = 1; i <= successes; i++) {
                let ratios = probabilities.map(p => Math.pow(p / (1 - Math.min(p, .99999)), i))
                    .reduce((sum, current) => sum + current);
                let negOneToIMinusOne = Math.pow(-1, i - 1);
                let previousProbability = this.probabilityOfSuccess(probabilities, successes - i);
                probability += negOneToIMinusOne * previousProbability * ratios;
            }
            this.computedProbabilities[successes] = (1 / successes) * probability;
        }
        return this.computedProbabilities[successes];
    }
}
export class PoolStatistics {
    public deviation: number;
    // coefficient of variance
    public cv: number;
    public distribution: number[];

    constructor(public mean: number, variance: number) {
        this.deviation = Math.sqrt(variance);
        this.cv = (this.deviation / this.mean) * 100;
        this.distribution = [
            //Math.min(0, this.mean - (2 * this.deviation)),
            Math.max(0, this.mean - this.deviation),
            this.mean,
            this.mean + this.deviation,
        ];
    }

    applyProbability(p: number): PoolStatistics {
        this.mean = this.mean * p;
        this.deviation = this.deviation * p;
        this.distribution = this.distribution.map(x => x * p);
        return this;
    }
    sum(other: PoolStatistics): PoolStatistics {
        this.mean = this.mean + other.mean;
        this.deviation = this.deviation + other.deviation;
        for (let i = 0; i < this.distribution.length; i++) {
            this.distribution[i] = this.distribution[i] + other.distribution[i];
        }
        return this;
    }
}

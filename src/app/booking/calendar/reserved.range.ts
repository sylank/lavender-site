
export class ReservedRange {
    public range: number[];
    public temporary: boolean;

    constructor(range: number[], temporary: boolean) {
        this.range = range;
        this.temporary = temporary;
    }
}

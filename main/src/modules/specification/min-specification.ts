import { Specification } from '@modules/specification/model/specification';

export class MinSpecification extends Specification<number> {
    constructor(private value: number) {
        super();
    }

    isSatisfiedBy(item: number): boolean {
        return item >= this.value;
    }
}

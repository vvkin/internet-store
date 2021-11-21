import { Specification } from '@modules/specification/model/specification';

export class IncludesSpecification<T> extends Specification<T> {
    constructor(private values: T[]) {
        super();
    }

    isSatisfiedBy(item: T): boolean {
        return this.values.includes(item);
    }
}

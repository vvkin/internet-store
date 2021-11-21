import { Specification } from '@modules/specification/model/specification';

export class TrueSpecification<T> extends Specification<T> {
    isSatisfiedBy(item?: T): boolean {
        return true;
    }
}

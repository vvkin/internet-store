import { Specification } from '@modules/specification/model/specification';

export class LikeSpecification extends Specification<string> {
    constructor(private pattern: string) {
        super();
    }

    isSatisfiedBy(item: string): boolean {
        return item.toLowerCase().startsWith(this.pattern.toLowerCase());
    }
}

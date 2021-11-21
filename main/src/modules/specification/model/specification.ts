export abstract class Specification<T> {
    abstract isSatisfiedBy(item: T): boolean;

    and(other: Specification<T>): Specification<T> {
        return new AndSpecification(this, other);
    }

    or(other: Specification<T>): Specification<T> {
        return new OrSpecification(this, other);
    }

    not(): Specification<T> {
        return new NotSpecification(this);
    }
}

class AndSpecification<T> extends Specification<T> {
    constructor(
        private left: Specification<T>,
        private right: Specification<T>
    ) {
        super();
    }

    isSatisfiedBy(item: T): boolean {
        return this.left.isSatisfiedBy(item) && this.right.isSatisfiedBy(item);
    }
}

class OrSpecification<T> extends Specification<T> {
    constructor(
        private left: Specification<T>,
        private right: Specification<T>
    ) {
        super();
    }

    isSatisfiedBy(item: T): boolean {
        return this.left.isSatisfiedBy(item) || this.right.isSatisfiedBy(item);
    }
}

export class NotSpecification<T> extends Specification<T> {
    constructor(private other: Specification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean {
        return !this.other.isSatisfiedBy(candidate);
    }
}

import { Knex } from 'knex';

export class Builder {
    constructor(private query: Knex.QueryBuilder) {}

    min(column: string, value?: number): Builder {
        if (value) this.query = this.query.where(column, '>=', value);
        return this;
    }

    max(column: string, value?: number): Builder {
        if (value) this.query = this.query.where(column, '<=', value);
        return this;
    }

    in(column: string, values?: (string | number)[]): Builder {
        if (values) this.query = this.query.whereIn(column, values);
        return this;
    }

    like(column: string, value?: string): Builder {
        if (value) this.query = this.query.where(column, 'ilike', `${value}%`);
        return this;
    }

    collect(): string {
        return this.query.toQuery();
    }
}

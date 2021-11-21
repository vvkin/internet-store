import { MinSpecification } from '@modules/specification/min-specification';
import { MaxSpecification } from '@modules/specification/max.specification';
import { LikeSpecification } from '@modules/specification/like.specification';
import { IncludesSpecification } from '@modules/specification/includes.specification';

export type ProductSpecificationType =
    | typeof MinSpecification
    | typeof MaxSpecification
    | typeof LikeSpecification
    | typeof IncludesSpecification;

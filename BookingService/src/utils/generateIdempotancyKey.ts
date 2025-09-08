import {v4 as uuidv4} from "uuid";

export function generateIdempotancyKey(): string {
    return uuidv4();
}
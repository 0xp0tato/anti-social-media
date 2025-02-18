import { SerializedErrorField } from './serializedErrorField';

export type SerializedError = {
    message: string;
    fields?: SerializedErrorField;
};

declare const opaque: unique symbol;
export type Opaque<T, OpaqueType> = T & { readonly [opaque]: OpaqueType };

export type ID = Opaque<string, 'ID'>;

export type Index = Opaque<number, 'Index'>;

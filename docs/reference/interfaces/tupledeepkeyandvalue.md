---
id: TupleDeepKeyAndValue
title: TupleDeepKeyAndValue
---

<!-- DO NOT EDIT: this page is autogenerated from the type comments -->

# Interface: TupleDeepKeyAndValue\<TParent, T, TKey\>

Defined in: [packages/form-core/src/util-types.ts:56](https://github.com/TanStack/form/blob/main/packages/form-core/src/util-types.ts#L56)

## Extends

- [`AnyDeepKeyAndValue`](../anydeepkeyandvalue.md)

## Type Parameters

• **TParent** *extends* [`AnyDeepKeyAndValue`](../anydeepkeyandvalue.md)

• **T**

• **TKey** *extends* [`AllTupleKeys`](../../type-aliases/alltuplekeys.md)\<`T`\>

## Properties

### key

```ts
key: `${TParent["key"] extends never ? "" : TParent["key"]}[${TKey}]`;
```

Defined in: [packages/form-core/src/util-types.ts:61](https://github.com/TanStack/form/blob/main/packages/form-core/src/util-types.ts#L61)

#### Overrides

[`AnyDeepKeyAndValue`](../anydeepkeyandvalue.md).[`key`](../AnyDeepKeyAndValue.md#key)

***

### value

```ts
value: 
  | T[TKey]
| Nullable<TParent["value"]>;
```

Defined in: [packages/form-core/src/util-types.ts:62](https://github.com/TanStack/form/blob/main/packages/form-core/src/util-types.ts#L62)

#### Overrides

[`AnyDeepKeyAndValue`](../anydeepkeyandvalue.md).[`value`](../AnyDeepKeyAndValue.md#value)

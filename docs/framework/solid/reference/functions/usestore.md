---
id: useStore
title: useStore
---

<!-- DO NOT EDIT: this page is autogenerated from the type comments -->

# Function: useStore()

## Call Signature

```ts
function useStore<TState, TSelected>(store, selector?): Accessor<TSelected>
```

Defined in: node\_modules/.pnpm/@tanstack+solid-store@0.7.3\_solid-js@1.9.7/node\_modules/@tanstack/solid-store/dist/esm/index.d.ts:8

### Type Parameters

• **TState**

• **TSelected** = `NoInfer`\<`TState`\>

### Parameters

#### store

`Store`\<`TState`, `any`\>

#### selector?

(`state`) => `TSelected`

### Returns

`Accessor`\<`TSelected`\>

## Call Signature

```ts
function useStore<TState, TSelected>(store, selector?): Accessor<TSelected>
```

Defined in: node\_modules/.pnpm/@tanstack+solid-store@0.7.3\_solid-js@1.9.7/node\_modules/@tanstack/solid-store/dist/esm/index.d.ts:9

### Type Parameters

• **TState**

• **TSelected** = `NoInfer`\<`TState`\>

### Parameters

#### store

`Derived`\<`TState`, `any`\>

#### selector?

(`state`) => `TSelected`

### Returns

`Accessor`\<`TSelected`\>

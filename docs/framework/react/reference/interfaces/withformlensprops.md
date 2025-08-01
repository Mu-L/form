---
id: WithFormLensProps
title: WithFormLensProps
---

<!-- DO NOT EDIT: this page is autogenerated from the type comments -->

# Interface: WithFormLensProps\<TFieldGroupData, TFieldComponents, TFormComponents, TSubmitMeta, TRenderProps\>

Defined in: [packages/react-form/src/createFormHook.tsx:229](https://github.com/TanStack/form/blob/main/packages/react-form/src/createFormHook.tsx#L229)

## Extends

- `BaseFormOptions`\<`TFieldGroupData`, `TSubmitMeta`\>

## Type Parameters

• **TFieldGroupData**

• **TFieldComponents** *extends* `Record`\<`string`, `ComponentType`\<`any`\>\>

• **TFormComponents** *extends* `Record`\<`string`, `ComponentType`\<`any`\>\>

• **TSubmitMeta**

• **TRenderProps** *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `never`\>

## Properties

### props?

```ts
optional props: TRenderProps;
```

Defined in: [packages/react-form/src/createFormHook.tsx:237](https://github.com/TanStack/form/blob/main/packages/react-form/src/createFormHook.tsx#L237)

***

### render()

```ts
render: (props) => Element;
```

Defined in: [packages/react-form/src/createFormHook.tsx:238](https://github.com/TanStack/form/blob/main/packages/react-form/src/createFormHook.tsx#L238)

#### Parameters

##### props

`PropsWithChildren`\<`NoInfer`\<`TRenderProps`\> & `object`\>

#### Returns

`Element`

---
id: FormState
title: FormState
---

<!-- DO NOT EDIT: this page is autogenerated from the type comments -->

# Interface: FormState\<TFormData, TOnMount, TOnChange, TOnChangeAsync, TOnBlur, TOnBlurAsync, TOnSubmit, TOnSubmitAsync, TOnServer\>

Defined in: [packages/form-core/src/FormApi.ts:648](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L648)

An object representing the current state of the form.

## Extends

- [`BaseFormState`](../../type-aliases/baseformstate.md)\<`TFormData`, `TOnMount`, `TOnChange`, `TOnChangeAsync`, `TOnBlur`, `TOnBlurAsync`, `TOnSubmit`, `TOnSubmitAsync`, `TOnServer`\>.[`DerivedFormState`](../../type-aliases/derivedformstate.md)\<`TFormData`, `TOnMount`, `TOnChange`, `TOnChangeAsync`, `TOnBlur`, `TOnBlurAsync`, `TOnSubmit`, `TOnSubmitAsync`, `TOnServer`\>

## Type Parameters

• **TFormData**

• **TOnMount** *extends* `undefined` \| `FormValidateOrFn`\<`TFormData`\>

• **TOnChange** *extends* `undefined` \| `FormValidateOrFn`\<`TFormData`\>

• **TOnChangeAsync** *extends* `undefined` \| `FormAsyncValidateOrFn`\<`TFormData`\>

• **TOnBlur** *extends* `undefined` \| `FormValidateOrFn`\<`TFormData`\>

• **TOnBlurAsync** *extends* `undefined` \| `FormAsyncValidateOrFn`\<`TFormData`\>

• **TOnSubmit** *extends* `undefined` \| `FormValidateOrFn`\<`TFormData`\>

• **TOnSubmitAsync** *extends* `undefined` \| `FormAsyncValidateOrFn`\<`TFormData`\>

• **TOnServer** *extends* `undefined` \| `FormAsyncValidateOrFn`\<`TFormData`\>

## Properties

### \_force\_re\_eval?

```ts
optional _force_re_eval: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:571](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L571)

@private, used to force a re-evaluation of the form state when options change

#### Inherited from

```ts
BaseFormState._force_re_eval
```

***

### canSubmit

```ts
canSubmit: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:641](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L641)

A boolean indicating if the form can be submitted based on its current state.

#### Inherited from

```ts
DerivedFormState.canSubmit
```

***

### errorMap

```ts
errorMap: ValidationErrorMap<UnwrapFormValidateOrFn<TOnMount>, UnwrapFormValidateOrFn<TOnChange>, UnwrapFormAsyncValidateOrFn<TOnChangeAsync>, UnwrapFormValidateOrFn<TOnBlur>, UnwrapFormAsyncValidateOrFn<TOnBlurAsync>, UnwrapFormValidateOrFn<TOnSubmit>, UnwrapFormAsyncValidateOrFn<TOnSubmitAsync>, UnwrapFormAsyncValidateOrFn<TOnServer>>;
```

Defined in: [packages/form-core/src/FormApi.ts:517](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L517)

The error map for the form itself.

#### Inherited from

```ts
BaseFormState.errorMap
```

***

### errors

```ts
errors: (
  | UnwrapFormValidateOrFn<TOnMount>
  | UnwrapFormValidateOrFn<TOnChange>
  | UnwrapFormAsyncValidateOrFn<TOnChangeAsync>
  | UnwrapFormValidateOrFn<TOnBlur>
  | UnwrapFormAsyncValidateOrFn<TOnBlurAsync>
  | UnwrapFormValidateOrFn<TOnSubmit>
  | UnwrapFormAsyncValidateOrFn<TOnSubmitAsync>
  | UnwrapFormAsyncValidateOrFn<TOnServer>)[];
```

Defined in: [packages/form-core/src/FormApi.ts:596](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L596)

The error array for the form itself.

#### Inherited from

```ts
DerivedFormState.errors
```

***

### fieldMeta

```ts
fieldMeta: Record<DeepKeys<TFormData>, AnyFieldMeta>;
```

Defined in: [packages/form-core/src/FormApi.ts:645](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L645)

A record of field metadata for each field in the form.

#### Inherited from

```ts
DerivedFormState.fieldMeta
```

***

### fieldMetaBase

```ts
fieldMetaBase: Record<DeepKeys<TFormData>, AnyFieldMetaBase>;
```

Defined in: [packages/form-core/src/FormApi.ts:534](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L534)

A record of field metadata for each field in the form, not including the derived properties, like `errors` and such

#### Inherited from

```ts
BaseFormState.fieldMetaBase
```

***

### isBlurred

```ts
isBlurred: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:621](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L621)

A boolean indicating if any of the form fields have been blurred.

#### Inherited from

```ts
DerivedFormState.isBlurred
```

***

### isDefaultValue

```ts
isDefaultValue: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:633](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L633)

A boolean indicating if all of the form's fields are the same as default values.

#### Inherited from

```ts
DerivedFormState.isDefaultValue
```

***

### isDirty

```ts
isDirty: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:625](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L625)

A boolean indicating if any of the form's fields' values have been modified by the user. Evaluates `true` if the user have modified at least one of the fields. Opposite of `isPristine`.

#### Inherited from

```ts
DerivedFormState.isDirty
```

***

### isFieldsValid

```ts
isFieldsValid: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:613](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L613)

A boolean indicating if all the form fields are valid. Evaluates `true` if there are no field errors.

#### Inherited from

```ts
DerivedFormState.isFieldsValid
```

***

### isFieldsValidating

```ts
isFieldsValidating: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:609](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L609)

A boolean indicating if any of the form fields are currently validating.

#### Inherited from

```ts
DerivedFormState.isFieldsValidating
```

***

### isFormValid

```ts
isFormValid: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:592](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L592)

A boolean indicating if the form is valid.

#### Inherited from

```ts
DerivedFormState.isFormValid
```

***

### isFormValidating

```ts
isFormValidating: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:588](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L588)

A boolean indicating if the form is currently validating.

#### Inherited from

```ts
DerivedFormState.isFormValidating
```

***

### isPristine

```ts
isPristine: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:629](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L629)

A boolean indicating if none of the form's fields' values have been modified by the user. Evaluates `true` if the user have not modified any of the fields. Opposite of `isDirty`.

#### Inherited from

```ts
DerivedFormState.isPristine
```

***

### isSubmitSuccessful

```ts
isSubmitSuccessful: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:567](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L567)

A boolean indicating if the last submission was successful.

#### Inherited from

```ts
BaseFormState.isSubmitSuccessful
```

***

### isSubmitted

```ts
isSubmitted: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:555](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L555)

A boolean indicating if the `onSubmit` function has completed successfully.

Goes back to `false` at each new submission attempt.

Note: you can use isSubmitting to check if the form is currently submitting.

#### Inherited from

```ts
BaseFormState.isSubmitted
```

***

### isSubmitting

```ts
isSubmitting: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:547](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L547)

A boolean indicating if the form is currently in the process of being submitted after `handleSubmit` is called.

Goes back to `false` when submission completes for one of the following reasons:
- the validation step returned errors.
- the `onSubmit` function has completed.

Note: if you're running async operations in your `onSubmit` function make sure to await them to ensure `isSubmitting` is set to `false` only when the async operation completes.

This is useful for displaying loading indicators or disabling form inputs during submission.

#### Inherited from

```ts
BaseFormState.isSubmitting
```

***

### isTouched

```ts
isTouched: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:617](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L617)

A boolean indicating if any of the form fields have been touched.

#### Inherited from

```ts
DerivedFormState.isTouched
```

***

### isValid

```ts
isValid: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:637](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L637)

A boolean indicating if the form and all its fields are valid. Evaluates `true` if there are no errors.

#### Inherited from

```ts
DerivedFormState.isValid
```

***

### isValidating

```ts
isValidating: boolean;
```

Defined in: [packages/form-core/src/FormApi.ts:559](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L559)

A boolean indicating if the form or any of its fields are currently validating.

#### Inherited from

```ts
BaseFormState.isValidating
```

***

### submissionAttempts

```ts
submissionAttempts: number;
```

Defined in: [packages/form-core/src/FormApi.ts:563](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L563)

A counter for tracking the number of submission attempts.

#### Inherited from

```ts
BaseFormState.submissionAttempts
```

***

### validationMetaMap

```ts
validationMetaMap: Record<"onChange" | "onBlur" | "onSubmit" | "onMount" | "onServer", undefined | ValidationMeta>;
```

Defined in: [packages/form-core/src/FormApi.ts:530](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L530)

An internal mechanism used for keeping track of validation logic in a form.

#### Inherited from

```ts
BaseFormState.validationMetaMap
```

***

### values

```ts
values: TFormData;
```

Defined in: [packages/form-core/src/FormApi.ts:513](https://github.com/TanStack/form/blob/main/packages/form-core/src/FormApi.ts#L513)

The current values of the form fields.

#### Inherited from

```ts
BaseFormState.values
```

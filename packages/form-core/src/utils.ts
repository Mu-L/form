import type { FieldValidators } from './FieldApi'
import type { FormValidators } from './FormApi'
import type {
  GlobalFormValidationError,
  ValidationCause,
  ValidationError,
  ValidationSource,
} from './types'

export type UpdaterFn<TInput, TOutput = TInput> = (input: TInput) => TOutput

export type Updater<TInput, TOutput = TInput> =
  | TOutput
  | UpdaterFn<TInput, TOutput>

/**
 * @private
 */
export function functionalUpdate<TInput, TOutput = TInput>(
  updater: Updater<TInput, TOutput>,
  input: TInput,
): TOutput {
  return typeof updater === 'function'
    ? (updater as UpdaterFn<TInput, TOutput>)(input)
    : updater
}

/**
 * Get a value from an object using a path, including dot notation.
 * @private
 */
export function getBy(obj: any, path: any) {
  const pathObj = makePathArray(path)
  return pathObj.reduce((current: any, pathPart: any) => {
    if (current === null) return null
    if (typeof current !== 'undefined') {
      return current[pathPart]
    }
    return undefined
  }, obj)
}

/**
 * Set a value on an object using a path, including dot notation.
 * @private
 */
export function setBy(obj: any, _path: any, updater: Updater<any>) {
  const path = makePathArray(_path)

  function doSet(parent?: any): any {
    if (!path.length) {
      return functionalUpdate(updater, parent)
    }

    const key = path.shift()

    if (
      typeof key === 'string' ||
      (typeof key === 'number' && !Array.isArray(parent))
    ) {
      if (typeof parent === 'object') {
        if (parent === null) {
          parent = {}
        }
        return {
          ...parent,
          [key]: doSet(parent[key]),
        }
      }
      return {
        [key]: doSet(),
      }
    }

    if (Array.isArray(parent) && typeof key === 'number') {
      const prefix = parent.slice(0, key)
      return [
        ...(prefix.length ? prefix : new Array(key)),
        doSet(parent[key]),
        ...parent.slice(key + 1),
      ]
    }
    return [...new Array(key), doSet()]
  }

  return doSet(obj)
}

/**
 * Delete a field on an object using a path, including dot notation.
 * @private
 */
export function deleteBy(obj: any, _path: any) {
  const path = makePathArray(_path)

  function doDelete(parent: any): any {
    if (!parent) return
    if (path.length === 1) {
      const finalPath = path[0]!
      if (Array.isArray(parent) && typeof finalPath === 'number') {
        return parent.filter((_, i) => i !== finalPath)
      }
      const { [finalPath]: remove, ...rest } = parent
      return rest
    }

    const key = path.shift()

    if (typeof key === 'string') {
      if (typeof parent === 'object') {
        return {
          ...parent,
          [key]: doDelete(parent[key]),
        }
      }
    }

    if (typeof key === 'number') {
      if (Array.isArray(parent)) {
        if (key >= parent.length) {
          return parent
        }
        const prefix = parent.slice(0, key)
        return [
          ...(prefix.length ? prefix : new Array(key)),
          doDelete(parent[key]),
          ...parent.slice(key + 1),
        ]
      }
    }

    throw new Error('It seems we have created an infinite loop in deleteBy. ')
  }

  return doDelete(obj)
}

const reLineOfOnlyDigits = /^(\d+)$/gm
// the second dot must be in a lookahead or the engine
// will skip subsequent numbers (like foo.0.1.)
const reDigitsBetweenDots = /\.(\d+)(?=\.)/gm
const reStartWithDigitThenDot = /^(\d+)\./gm
const reDotWithDigitsToEnd = /\.(\d+$)/gm
const reMultipleDots = /\.{2,}/gm

const intPrefix = '__int__'
const intReplace = `${intPrefix}$1`

/**
 * @private
 */
export function makePathArray(str: string | Array<string | number>) {
  if (Array.isArray(str)) {
    return [...str]
  }

  if (typeof str !== 'string') {
    throw new Error('Path must be a string.')
  }

  return (
    str
      // Leading `[` may lead to wrong parsing down the line
      // (Example: '[0][1]' should be '0.1', not '.0.1')
      .replace(/(^\[)|]/gm, '')
      .replace(/\[/g, '.')
      .replace(reLineOfOnlyDigits, intReplace)
      .replace(reDigitsBetweenDots, `.${intReplace}.`)
      .replace(reStartWithDigitThenDot, `${intReplace}.`)
      .replace(reDotWithDigitsToEnd, `.${intReplace}`)
      .replace(reMultipleDots, '.')
      .split('.')
      .map((d) => {
        if (d.startsWith(intPrefix)) {
          const numStr = d.substring(intPrefix.length)
          const num = parseInt(numStr, 10)

          if (String(num) === numStr) {
            return num
          }
          return numStr
        }
        return d
      })
  )
}

/**
 * @private
 */
export function concatenatePaths(path1: string, path2: string): string {
  if (path1.length === 0) return path2
  if (path2.length === 0) return path1

  if (path2.startsWith('[')) {
    return path1 + path2
  }

  // In cases where parent and child withFieldGroup forms are both nested
  if (path2.startsWith('.')) {
    return path1 + path2
  }

  return `${path1}.${path2}`
}

/**
 * @private
 */
export function isNonEmptyArray(obj: any) {
  return !(Array.isArray(obj) && obj.length === 0)
}

interface AsyncValidatorArrayPartialOptions<T> {
  validators?: T
  asyncDebounceMs?: number
}

/**
 * @private
 */
export interface AsyncValidator<T> {
  cause: ValidationCause
  validate: T
  debounceMs: number
}

/**
 * @private
 */
export function getAsyncValidatorArray<T>(
  cause: ValidationCause,
  options: AsyncValidatorArrayPartialOptions<T>,
): T extends FieldValidators<any, any, any, any, any, any, any, any, any, any>
  ? Array<
      AsyncValidator<T['onChangeAsync'] | T['onBlurAsync'] | T['onSubmitAsync']>
    >
  : T extends FormValidators<any, any, any, any, any, any, any, any>
    ? Array<
        AsyncValidator<
          T['onChangeAsync'] | T['onBlurAsync'] | T['onSubmitAsync']
        >
      >
    : never {
  const { asyncDebounceMs } = options
  const {
    onChangeAsync,
    onBlurAsync,
    onSubmitAsync,
    onBlurAsyncDebounceMs,
    onChangeAsyncDebounceMs,
  } = (options.validators || {}) as
    | FieldValidators<any, any, any, any, any, any, any, any, any, any>
    | FormValidators<any, any, any, any, any, any, any, any>

  const defaultDebounceMs = asyncDebounceMs ?? 0

  const changeValidator = {
    cause: 'change',
    validate: onChangeAsync,
    debounceMs: onChangeAsyncDebounceMs ?? defaultDebounceMs,
  } as const

  const blurValidator = {
    cause: 'blur',
    validate: onBlurAsync,
    debounceMs: onBlurAsyncDebounceMs ?? defaultDebounceMs,
  } as const

  const submitValidator = {
    cause: 'submit',
    validate: onSubmitAsync,
    debounceMs: 0,
  } as const

  const noopValidator = (
    validator:
      | typeof changeValidator
      | typeof blurValidator
      | typeof submitValidator,
  ) => ({ ...validator, debounceMs: 0 }) as const

  switch (cause) {
    case 'submit':
      return [
        noopValidator(changeValidator),
        noopValidator(blurValidator),
        submitValidator,
      ] as never
    case 'blur':
      return [blurValidator] as never
    case 'change':
      return [changeValidator] as never
    case 'server':
    default:
      return [] as never
  }
}

interface SyncValidatorArrayPartialOptions<T> {
  validators?: T
}

/**
 * @private
 */
export interface SyncValidator<T> {
  cause: ValidationCause
  validate: T
}

/**
 * @private
 */
export function getSyncValidatorArray<T>(
  cause: ValidationCause,
  options: SyncValidatorArrayPartialOptions<T>,
): T extends FieldValidators<any, any, any, any, any, any, any, any, any, any>
  ? Array<
      SyncValidator<T['onChange'] | T['onBlur'] | T['onSubmit'] | T['onMount']>
    >
  : T extends FormValidators<any, any, any, any, any, any, any, any>
    ? Array<
        SyncValidator<
          T['onChange'] | T['onBlur'] | T['onSubmit'] | T['onMount']
        >
      >
    : never {
  const { onChange, onBlur, onSubmit, onMount } = (options.validators || {}) as
    | FieldValidators<any, any, any, any, any, any, any, any, any, any>
    | FormValidators<any, any, any, any, any, any, any, any>

  const changeValidator = { cause: 'change', validate: onChange } as const
  const blurValidator = { cause: 'blur', validate: onBlur } as const
  const submitValidator = { cause: 'submit', validate: onSubmit } as const
  const mountValidator = { cause: 'mount', validate: onMount } as const

  // Allows us to clear onServer errors
  const serverValidator = {
    cause: 'server',
    validate: () => undefined,
  } as const

  switch (cause) {
    case 'mount':
      return [mountValidator] as never
    case 'submit':
      return [
        changeValidator,
        blurValidator,
        submitValidator,
        serverValidator,
      ] as never
    case 'server':
      return [serverValidator] as never
    case 'blur':
      return [blurValidator, serverValidator] as never
    case 'change':
    default:
      return [changeValidator, serverValidator] as never
  }
}

export const isGlobalFormValidationError = (
  error: unknown,
): error is GlobalFormValidationError<unknown> => {
  return !!error && typeof error === 'object' && 'fields' in error
}

export function evaluate<T>(objA: T, objB: T) {
  if (Object.is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false
    }
    return true
  }

  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false
    for (const v of objA) {
      if (!objB.has(v)) return false
    }
    return true
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    // performs recursive search down the object tree

    if (
      !keysB.includes(key) ||
      !evaluate(objA[key as keyof T], objB[key as keyof T])
    ) {
      return false
    }
  }

  return true
}

/**
 * Determines the logic for determining the error source and value to set on the field meta within the form level sync/async validation.
 * @private
 */
export const determineFormLevelErrorSourceAndValue = ({
  newFormValidatorError,
  isPreviousErrorFromFormValidator,
  previousErrorValue,
}: {
  newFormValidatorError: ValidationError
  isPreviousErrorFromFormValidator: boolean
  previousErrorValue: ValidationError
}): {
  newErrorValue: ValidationError
  newSource: ValidationSource | undefined
} => {
  // All falsy values are not considered errors
  if (newFormValidatorError) {
    return { newErrorValue: newFormValidatorError, newSource: 'form' }
  }

  // Clears form level error since it's now stale
  if (isPreviousErrorFromFormValidator) {
    return { newErrorValue: undefined, newSource: undefined }
  }

  // At this point, we have a preivous error which must have been set by the field validator, keep as is
  if (previousErrorValue) {
    return { newErrorValue: previousErrorValue, newSource: 'field' }
  }

  // No new or previous error, clear the error
  return { newErrorValue: undefined, newSource: undefined }
}

/**
 * Determines the logic for determining the error source and value to set on the field meta within the field level sync/async validation.
 * @private
 */
export const determineFieldLevelErrorSourceAndValue = ({
  formLevelError,
  fieldLevelError,
}: {
  formLevelError: ValidationError
  fieldLevelError: ValidationError
}): {
  newErrorValue: ValidationError
  newSource: ValidationSource | undefined
} => {
  // At field level, we prioritize the field level error
  if (fieldLevelError) {
    return { newErrorValue: fieldLevelError, newSource: 'field' }
  }

  // If there is no field level error, and there is a form level error, we set the form level error
  if (formLevelError) {
    return { newErrorValue: formLevelError, newSource: 'form' }
  }

  return { newErrorValue: undefined, newSource: undefined }
}

export function createFieldMap<T>(values: Readonly<T>): { [K in keyof T]: K } {
  const output: { [K in keyof T]: K } = {} as any

  for (const key in values) {
    output[key] = key
  }

  return output
}

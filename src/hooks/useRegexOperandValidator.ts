import type { StringArrayCondition, StringCondition } from '@loli-feature-flags/loli-sdk'
import { computed, type ModelRef } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useRegexOperandValidator(
  conditionModel: ModelRef<StringCondition | StringArrayCondition>
) {
  const i18n = useI18n()

  return computed<undefined | ((value: string) => true | string)>(() => {
    if (
      conditionModel.value.operator === 'matchesRegex' ||
      conditionModel.value.operator === 'doesNotMatchRegex'
    ) {
      return (value) => {
        try {
          new RegExp(value)
          return true
        } catch (error) {
          return i18n.t('spec.operands.string.validation.invalidRegex', {
            details: `${error}`
          })
        }
      }
    }

    return undefined
  })
}

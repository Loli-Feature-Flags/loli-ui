import type { FeatureFlag } from '@loli-feature-flags/loli-sdk-js'
import { i18n } from '@/i18n'

export function i18nFeatureFlagDefaultValue(featureFlag: FeatureFlag): string {
  if (featureFlag.type === 'boolean') {
    return i18n.global.t(`spec.featureFlag.value.${featureFlag.defaultValue}`)
  } else if (featureFlag.type === 'string') {
    return featureFlag.defaultValue.length === 0
      ? i18n.global.t(`spec.featureFlag.value.emptyString`)
      : featureFlag.defaultValue
  } else if (featureFlag.type === 'number') {
    return featureFlag.defaultValue.toString()
  }

  return '#error#'
}

export function isFeatureFlagStale(featureFlag: FeatureFlag): boolean {
  return (
    featureFlag.targeting.rules.length === 0 ||
    featureFlag.targeting.rules.every(
      (rule) => rule.conditionSet.conditions.length === 0 || !rule.enabled
    )
  )
}

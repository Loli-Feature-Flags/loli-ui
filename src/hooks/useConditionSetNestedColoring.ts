import { inject, provide } from 'vue'

const nestedLevelKey = 'conditionSetNestedColoringLevel'

export default function useConditionSetNestedColoring(skipIncrement?: boolean) {
  const nestedLevel = inject<number>(nestedLevelKey, 0)
  provide(nestedLevelKey, nestedLevel + (skipIncrement ? 0 : 1))

  const hoverBorderColorsLevels = [
    'hover:border-primary-500',
    'hover:border-cerulean-500',
    'hover:border-zest-500'
  ]

  const hoverRingColorsLevels = [
    'hover:ring-primary-200',
    'hover:ring-cerulean-200',
    'hover:ring-zest-200'
  ]

  const hoverBorderColor = hoverBorderColorsLevels[nestedLevel % hoverBorderColorsLevels.length]
  const hoverRingColor = hoverRingColorsLevels[nestedLevel % hoverRingColorsLevels.length]

  return {
    ringClasses: 'hover:ring-1 hover:ring-offset-2',
    hoverBorderColor,
    hoverRingColor
  }
}

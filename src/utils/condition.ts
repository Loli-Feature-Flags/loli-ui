import type {
  BooleanArrayCondition,
  BooleanCondition,
  NumberArrayCondition,
  NumberCondition,
  Property,
  PropertyCondition,
  StringArrayCondition,
  StringCondition
} from '@loli-feature-flags/loli-sdk'

export function createDefaultConditionForProperty(property: Property): PropertyCondition {
  const propertyId = property.id

  switch (property.type) {
    case 'string':
      return createDefaultStringCondition(propertyId)
    case 'number':
      return createDefaultNumberCondition(propertyId)
    case 'boolean':
      return createDefaultBooleanCondition(propertyId)
    case 'stringArray':
      return createDefaultStringArrayCondition(propertyId)
    case 'numberArray':
      return createDefaultNumberArrayCondition(propertyId)
    case 'booleanArray':
      return createDefaultBooleanArrayCondition(propertyId)
    default:
      throw new Error(`Unknown property type ${property.type}`)
  }
}

function createDefaultStringCondition(propertyId: string): StringCondition {
  return {
    type: 'string',
    propertyId,
    operator: 'equals',
    operandsQuantifier: 'some',
    operands: []
  }
}

function createDefaultNumberCondition(propertyId: string): NumberCondition {
  return {
    type: 'number',
    propertyId,
    operator: 'equals',
    operandsQuantifier: 'some',
    operands: []
  }
}

function createDefaultBooleanCondition(propertyId: string): BooleanCondition {
  return {
    type: 'boolean',
    propertyId,
    operator: 'isTrue'
  }
}

function createDefaultStringArrayCondition(propertyId: string): StringArrayCondition {
  return {
    type: 'stringArray',
    propertyId,
    propertyArrayQuantifier: 'some',
    operator: 'equals',
    operandsQuantifier: 'some',
    operands: []
  }
}

function createDefaultNumberArrayCondition(propertyId: string): NumberArrayCondition {
  return {
    type: 'numberArray',
    propertyId,
    propertyArrayQuantifier: 'some',
    operator: 'equals',
    operandsQuantifier: 'some',
    operands: []
  }
}

function createDefaultBooleanArrayCondition(propertyId: string): BooleanArrayCondition {
  return {
    type: 'booleanArray',
    propertyId,
    propertyArrayQuantifier: 'some',
    operator: 'isTrue'
  }
}

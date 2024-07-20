export default {
  common: {
    dialog: {
      close: 'Close the dialog'
    },
    deleteDialog: 'In order to process the deletion, please confirm.',
    dragHandleTitle: 'Click to start dragging'
  },
  shared: {
    confirmDeleteDialog: {
      cancel: 'Cancel',
      confirm: 'Confirm deletion'
    },
    staleFeatureFlag:
      'Is this a stale feature flag?\nCurrently this flag has no enabled\ntargeting rules or only empty rules.',
    staleProperty:
      'Is this a stale property?\nThis property is not used by any\ncondition of a feature flag or segment.',
    targetingStatus: {
      active: 'Targeting is enabled',
      inactive: 'Targeting is disabled.'
    },
    rolloutDiscriminatorIndicator: 'Property is used as\na rollout discriminator.',
    noRolloutDiscriminatorPropertiesIndicator:
      'There are no rollout discriminator properties.\nGradual rollouts will not work as intended.',
    staleSegmentIndicator:
      'Is this a stale segment?\nThis segment is not referenced by\nany feature flag or another segment.',
    emptySegmentIndicator: 'Attention: This segment does\nnot have any conditions defined.',
    referencesIndicator:
      'Referenced\n- by {totalConditionReferences} condition(s)\n- by {featureFlagReferences} feature flag(s)\n- by {segmentReferences} segment(s)',
    validation: {
      cyclicDependencyIndicator: {
        partOfCyclicDependency:
          'Error: This element is directly part of\na cyclic dependency or causing it.\nCheck the JSON editor for more details.',
        hasCyclicDependency:
          'Error: This element contains a cyclic dependency.\nCheck the JSON edtitor for more details.'
      },
      duplicatedIdIndicator:
        'This element has the same ID as other elements.\nYou can fix the duplicated IDs via the JSON editor.',
      duplicatedFeatureFlagNameIndicator:
        'This feature flag has the same name as another feature flag.\nAdjust the feature flag names to be unique.\nCheck the JSON editor for more details.',
      duplicatedPropertyPathIndicator:
        'This property has the same property path as another property.\nAdjust the property paths to be unique.\nCheck the JSON editor for more details.',
      nonExistingPropertyReferenced:
        'This condition references an unknown property.\nPlease select an existing property or delete the condition.\nCheck the JSON editor for more details.',
      nonExistingSegmentReferenced:
        'This condition references an unknown segment.\nPlease select an existing segment or delete the condition.\nCheck the JSON editor for more details.',
      propertyConditionDataTypeMismatch:
        "This condition's data type does not match the\nreferenced property's data type. Remove/re-add\nthis condition or fix it via the JSON editor.",
      rolloutPercentagesNotOneHundred:
        'The sum of all rollout percentages is not 100%.\nMake sure all rollout percentages sum up to 100% to fix this.',
      noValuesOnMatch: `There must be at least one value to be applied on match.\nAdd a value to fix this.`
    }
  },
  navigation: {
    logo: 'Loli Feature Flags Logo',
    featureFlags: 'Feature Flags',
    segments: 'Segments',
    properties: 'Evaluation Context',
    jsonEditor: 'JSON Editor'
  },
  spec: {
    property: {
      type: {
        string: 'String',
        stringArray: 'String Array',
        number: 'Number',
        numberArray: 'Number Array',
        boolean: 'Boolean',
        booleanArray: 'Boolean Array'
      },
      validation: {
        pathPattern: 'Must denote a JavaScript style nested object accessor (e.g. user.id).'
      }
    },
    featureFlag: {
      type: {
        string: 'String',
        number: 'Number',
        boolean: 'Boolean'
      },
      value: {
        true: 'True',
        false: 'False',
        emptyString: 'empty string'
      },
      validation: {
        namePattern:
          'Must only contain letters and numbers separated by single dashes or underscores.'
      }
    },
    segment: {
      validation: {
        namePattern:
          'Must only contain letters and numbers separated by single dashes or underscores.'
      }
    },
    conditionSet: {
      operator: {
        and: 'AND – All must be true',
        or: 'OR – At least one must be true',
        nor: 'NOR – All must be false',
        nand: 'NAND – At least one must be false'
      },
      addCondition: 'Add condition',
      noConditions: 'No conditions defined yet.',
      noPropertiesDefined: 'No properties defined. Add one\nfirst to add a property condition.',
      noSegmentsDefined: 'No segments defined. Add one\nfirst to add a segment condition.'
    },
    quantifier: {
      some: 'some of',
      every: 'every of',
      notAny: 'not any of',
      notEvery: 'not every of'
    },
    stringCondition: {
      operator: {
        equals: 'equals',
        doesNotEqual: "doesn't equal",
        startsWith: 'starts with',
        doesNotStartWith: "doesn't start with",
        endsWith: 'ends with',
        doesNotEndWith: "doesn't end with",
        isBlank: 'is blank',
        isNotBlank: 'is not blank',
        matchesRegex: 'matches regex',
        doesNotMatchRegex: "doesn't match regex"
      }
    },
    numberCondition: {
      operator: {
        equals: 'equals',
        doesNotEqual: "doesn't equal",
        isLessThan: '<',
        isLessThanEquals: '≤',
        isGreaterThan: '>',
        isGreaterThanEquals: '≥',
        isOdd: 'is odd',
        isEven: 'is even'
      }
    },
    booleanCondition: {
      operator: {
        isTrue: 'is true',
        isFalse: 'is false'
      }
    },
    stringArrayCondition: {
      operator: {
        equals: 'equals',
        doesNotEqual: "doesn't equal",
        startsWith: 'starts with',
        doesNotStartWith: "doesn't start with",
        endsWith: 'ends with',
        doesNotEndWith: "doesn't end with",
        isBlank: 'is blank',
        isNotBlank: 'is not blank',
        matchesRegex: 'matches regex',
        doesNotMatchRegex: "doesn't match regex",
        hasElements: 'has elements',
        hasNoElements: 'has no elements'
      }
    },
    numberArrayCondition: {
      operator: {
        equals: 'equals',
        doesNotEqual: "doesn't equal",
        isLessThan: '<',
        isLessThanEquals: '≤',
        isGreaterThan: '>',
        isGreaterThanEquals: '≥',
        isOdd: 'is odd',
        isEven: 'is even',
        hasElements: 'has elements',
        hasNoElements: 'has no elements'
      }
    },
    booleanArrayCondition: {
      operator: {
        isTrue: 'is true',
        isFalse: 'is false',
        hasElements: 'has elements',
        hasNoElements: 'has no elements'
      }
    },
    segmentCondition: {
      open: 'Open segment definition',
      operator: {
        isTrue: 'is true',
        isFalse: 'is false'
      }
    },
    dateTimeCondition: {
      dateTime: 'Evaluation date/time',
      operator: {
        equalsOrIsAfter: 'equals / after',
        isBefore: 'before'
      },
      timezoneOffsetMode: {
        operandOffset: 'global time',
        localOffset: 'local time'
      }
    },
    operands: {
      string: {
        validation: {
          invalidRegex: 'This is not a valid regular expression. Details:\n{details}'
        }
      }
    }
  },
  conditions: {
    deleteCondition: 'Delete this condition',
    confirmDelete: {
      title: 'Delete condition',
      description: 'Are you sure you want to delete this condition?'
    },
    add: {
      title: 'Add a new condition',
      types: {
        select: 'Select condition type',
        propertyCondition: 'Property Condition',
        alwaysTrueCondition: 'Always True Condition',
        segmentCondition: 'Segment Condition',
        subConditionSet: 'Sub Condition Set',
        dateTimeCondition: 'Date and Time Condition'
      }
    },
    operands: {
      string: {
        addPlaceholder: 'Text value ...'
      },
      number: {
        addPlaceholder: 'Number value ...'
      }
    },
    alwaysTrueCondition: {
      message: 'I am an "Always True" pseudo condition.'
    }
  },
  views: {
    properties: {
      title: 'Context Properties',
      emptyState: {
        add: 'Add your first evaluation context property'
      },
      add: 'Add property',
      addDialog: {
        title: 'Add a property',
        path: {
          label: 'Object property path',
          placeholder: 'id, email, settings.betatester, ...'
        },
        name: {
          label: 'Display name',
          placeholder: 'User ID, User E-Mail, Beta Tester, ...'
        },
        type: {
          label: 'Data type'
        },
        rolloutDiscriminator: {
          labelTrue: 'Is a rollout discriminator.',
          labelFalse: 'Is not a rollout discriminator.'
        },
        add: 'Add new property'
      },
      searchPlaceholder: 'Search by path, name ...',
      clearSearch: 'Clear search',
      noEntriesFound: 'No properties found for this search.',
      entries: {
        path: 'Path'
      },
      editDialog: {
        title: 'Edit property',
        path: {
          label: 'Object property path',
          placeholder: 'id, email, settings.betatester, ...'
        },
        name: {
          label: 'Display name',
          placeholder: 'User ID, User E-Mail, Beta Tester, ...'
        },
        type: {
          label: 'Data type'
        },
        rolloutDiscriminator: {
          labelTrue: 'Is a rollout discriminator.',
          labelFalse: 'Is not a rollout discriminator.'
        },
        save: 'Save changes',
        cancel: 'Discard changes',
        delete: 'Delete this property',
        referencedDeleteDisabled:
          'The property is referenced by conditions. Referenced properties can not be deleted.'
      },
      deleteDialog: {
        title: 'Delete "{name}"',
        description: 'Are you sure you want to delete the evaluation context property "{name}"?'
      }
    },
    noViewAccessible: {
      message: 'You have no access to any of the feature flag management views.'
    },
    initializeSpec: {
      init: 'Initialize feature flag specification'
    },
    featureFlags: {
      emptyState: {
        add: 'Create your first feature flag'
      },
      title: 'Feature Flags',
      add: 'Create feature flag',
      addDialog: {
        title: 'Create a feature flag',
        name: {
          label: 'Unique name',
          placeholder: 'ai-copilot, dark-mode, ...'
        },
        type: {
          label: 'Output value type',
          placeholder: 'Choose type'
        },
        add: 'Create new feature flag'
      },
      searchPlaceholder: 'Search by name, description ...',
      clearSearch: 'Clear search',
      noEntriesFound: 'No feature flags found for this search.',
      entries: {
        fallbackPrefix: 'Fallback value'
      },
      editor: {
        editName: {
          start: 'Edit unique name',
          cancel: 'Cancel editing unique name',
          save: 'Save unique name'
        },
        copyName: 'Copy unique name to clipboard',
        copyNameSuccess: 'Unique name successfully copied to clipboard',
        delete: 'Delete this feature flag',
        deleteDialog: {
          title: 'Delete "{name}"',
          description: 'Are you sure you want to delete the feature flag "{name}"?'
        },
        description: {
          label: 'Description',
          placeholder: 'Enter a description here ...'
        },
        targeting: {
          title: 'Targeting',
          add: 'Add rule',
          noRules:
            'There are no rules defined yet. The default value will always be used when evaluating this feature flag.',
          switch: {
            enable: 'Enable targeting',
            disable: 'Disable targeting'
          },
          rules: {
            conditions: 'Conditions',
            delete: 'Delete this rule',
            deleteDialog: {
              title: 'Delete rule',
              description: 'Are you sure you want to delete the targeting rule?'
            },
            duplicate: 'Duplicate rule',
            switch: {
              enable: 'Enable this rule',
              disable: 'Disable this rule'
            },
            values: {
              title: 'Values to be applied',
              add: 'Add value',
              deleteValue: 'Delete this value.',
              deleteValueDisabled: `You can't delete this value. A rule must have at least one value.`,
              confirmDelete: {
                title: 'Delete value',
                description: 'Are you sure you want to delete this value?'
              },
              rolloutPercentage: {
                prefix: 'Apply to',
                thumbLabel: 'Percentage of users to roll this value out to.',
                suffix: '% of users matched by this rule.'
              },
              stringPlaceholder: 'Enter a text value'
            }
          }
        },
        defaultValue: {
          title: 'Default',
          label: 'Default value',
          stringPlaceholder: 'Enter a default text value ...'
        }
      }
    },
    segments: {
      title: 'Segments',
      add: 'Add segment',
      emptyState: {
        add: 'Create your first segment'
      },
      addDialog: {
        title: 'Add segment',
        add: 'Add new segment',
        name: {
          label: 'Segment name',
          placeholder: 'Beta Testers, Advanced Customers, ...'
        }
      },
      searchPlaceholder: 'Search by name ...',
      clearSearch: 'Clear search',
      noEntriesFound: 'No segments found for this search.',
      editDialog: {
        editName: {
          start: 'Edit name',
          cancel: 'Cancel editing name',
          save: 'Save name'
        },
        delete: 'Delete this segment',
        referencedDeleteDisabled:
          'The segment is referenced by conditions. Referenced segments can not be deleted.',
        deleteDialog: {
          title: 'Delete "{name}"',
          description: 'Are you sure you want to delete the segment "{name}"?'
        },
        conditionSet: {
          title: 'Segment Targeting'
        }
      }
    },
    jsonEditor: {
      title: 'JSON Editor',
      reset: 'Reset',
      save: 'Save changes',
      errors: {
        malformedJson: 'The JSON is invalid/malformed.',
        invalidSchema: "The JSON doesn't conform to the Loli spec schema.",
        semanticIssues: 'The Loli spec has semantic issues.'
      },
      errorDetails: {
        title: 'Error Details'
      }
    }
  }
}

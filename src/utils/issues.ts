import type { SemanticIssue, SemanticValidation, Path } from '@loli-feature-flags/loli-sdk-js'
import { filterIssuesByPartialPath, SemanticIssueType } from '@loli-feature-flags/loli-sdk-js'

export class IssuesCarryOn {
  private readonly allIssueTypes: Set<SemanticIssueType>

  constructor(
    public readonly pathPrefix: Path,
    public readonly issues: SemanticIssue[]
  ) {
    this.allIssueTypes = new Set(issues.map((issue) => issue.type))
  }

  createSub(addedPath: Path) {
    const newPath = [...this.pathPrefix, ...addedPath]

    return new IssuesCarryOn(newPath, filterIssuesByPartialPath(newPath, this.issues))
  }

  isValid() {
    return this.issues.length === 0
  }

  isInvalid() {
    return this.issues.length > 0
  }

  hasIssueType(type: SemanticIssueType): boolean {
    return this.allIssueTypes.has(type)
  }

  hasSomeIssueType(...types: SemanticIssueType[]): boolean {
    if (types.length === 0) return true
    if (this.allIssueTypes.size === 0) return false

    for (const type of types) {
      if (this.allIssueTypes.has(type)) {
        return true
      }
    }

    return false
  }

  static fromSemanticValidation(validation: SemanticValidation, partialPath?: Path) {
    const pathPrefix = partialPath ?? []

    return new IssuesCarryOn(pathPrefix, validation.getIssuesByPartialPath(pathPrefix))
  }

  static createEmpty() {
    return new IssuesCarryOn([], [])
  }
}

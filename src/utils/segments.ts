import { inject, provide, ref, type Ref } from 'vue'
import type { Segment } from '@loli-feature-flags/loli-sdk'

const rootSegmentIdKey = 'rootSegmentId'

export function provideRootSegment(segmentRef: Ref<Segment | null | undefined>) {
  provide(rootSegmentIdKey, segmentRef)
}

export function injectRootSegment(): Ref<Segment | null | undefined> | undefined {
  return inject(rootSegmentIdKey, ref(null))
}

export function isSegmentEmpty(segment: Segment): boolean {
  return segment.conditionSet.conditions.length === 0
}

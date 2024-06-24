// import type { LoliSpec } from '@loli-feature-flags/loli-sdk'
//
// type MinimizeMap<T> = {
//   [key in keyof T]?: T[key] extends Array<unknown>
//     ?
//         | string
//         | {
//             minimized: string
//             children: MinimizeMap<T[key][number]>
//           }
//     : T[key] extends Record<string, unknown>
//       ?
//           | string
//           | {
//               minimized: string
//               children: MinimizeMap<T[key]>
//             }
//       : string
// }
//
// export const loliSpecMinimizeMap: MinimizeMap<LoliSpec> = {
//   properties: {
//     minimized: 'ups',
//     children: {
//       type: 't',
//       name: 'n',
//       displayName: 'dn'
//     }
//   },
//   featureFlags: {
//     minimized: 'ffs',
//     children: {
//       type: 't',
//       name: 'n',
//       rules: {
//         minimized: 'rs',
//         children: {
//           conditions: {
//             minimized: 'cs',
//             children: {
//               type: 't',
//               oneOf: 'oo',
//               operator: 'op',
//               propertyName: 'upn'
//             }
//           },
//           valuesOnMatch: {
//             minimized: 'voms',
//             children: {
//               value: 'v',
//               rolloutPercentage: 'rp'
//             }
//           }
//         }
//       },
//       defaultValue: 'fv',
//       description: 'd',
//       ruleMatchingEnabled: 'rme'
//     }
//   },
//   schemaVersion: 'sv',
//   segments: {
//     minimized: 'rcs',
//     children: {
//       type: 't',
//       oneOf: 'oo',
//       operator: 'op',
//       propertyName: 'upn'
//     }
//   }
// }
//
// export function minimize<T extends Record<string, unknown>>(value: T, minimizeMap: MinimizeMap<T>) {
//   if (typeof value !== 'object') {
//     return value
//   }
//
//   const object: any = {}
//
//   for (const key of Object.keys(<Object>value)) {
//     const mapEntry = minimizeMap[key]
//     const rawValue = value[key]
//
//     if (typeof mapEntry === 'string') {
//       object[mapEntry] = rawValue
//     } else if (typeof mapEntry === 'object') {
//       const mappedValue = Array.isArray(rawValue)
//         ? rawValue.map((entry) =>
//             minimize(
//               entry as Record<string, unknown>,
//               mapEntry.children as MinimizeMap<Record<string, unknown>>
//             )
//           )
//         : minimize(
//             rawValue as Record<string, unknown>,
//             mapEntry.children as MinimizeMap<Record<string, unknown>>
//           )
//
//       object[mapEntry.minimized] = mappedValue
//     } else {
//       object[key] = rawValue
//     }
//   }
//
//   return object
// }

import { resolveTypeTopLevel } from '@lib/typedoc/resolve/lib'
import type { ApiReference } from '@lib/typedoc/types/apiReferences'
import type { ApiDeclaration } from '@lib/typedoc/types/typedoc'

const resolveSimple = (api: ApiDeclaration, name: string): ApiReference => {
  const simpleDeclaration = api.children.find((child) => child.name === name)

  let type: string
  if (simpleDeclaration.type) {
    type = resolveTypeTopLevel(simpleDeclaration.type)
  } else if (simpleDeclaration.signatures) {
    type = resolveTypeTopLevel(
      simpleDeclaration.signatures![0].type,
      undefined,
      [],
    )
  } else {
    type = resolveTypeTopLevel({
      type: 'reflection',
      declaration: simpleDeclaration,
    })
  }

  return {
    name,
    kind: 'simple',
    type: `type ${name} = ${type}`,
  }
}

export default resolveSimple

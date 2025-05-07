import resolveComponent from '@lib/typedoc/resolve/resolveComponent'
import resolveSimple from '@lib/typedoc/resolve/resolveSimple'
import type { ApiReference } from '@lib/typedoc/types/apiReferences'
import type { TypeSpecification } from '@lib/typedoc/types/specifications'
import type { ApiDeclaration } from '@lib/typedoc/types/typedoc'
import typeDoc from '../../../../../packages/solid-charts/api.json'

const api = typeDoc as unknown as ApiDeclaration

const resolveLibrary = (parts: TypeSpecification[]): ApiReference[] => {
  const apiReferences: ApiReference[] = []

  for (const part of parts) {
    switch (part.kind) {
      case 'component':
        apiReferences.push(resolveComponent(api, part.name, part))
        break
      case 'simple':
        apiReferences.push(resolveSimple(api, part.name))
        break
    }
  }

  return apiReferences
}

export default resolveLibrary

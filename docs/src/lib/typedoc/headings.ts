import apiPages from '@lib/typedoc/apiPages'

const getApiReferenceHeadings = (apiPageName?: keyof typeof apiPages) => {
  if (!apiPageName) return []

  const apiPage = apiPages[apiPageName]
  if (!apiPage) return []

  const headings: {
    text: string
    slug: string
  }[] = []

  for (const type of apiPage) {
    headings.push({
      text: type.kind === 'component' ? `<${type.name} />` : type.name,
      slug: encodeURIComponent(`api-${type.name.toLowerCase()}`),
    })
  }

  return headings
}

export default getApiReferenceHeadings

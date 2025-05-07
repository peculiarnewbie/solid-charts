export type ApiReference = ComponentApiReference | SimpleApiReference
export type ComponentApiReference = {
  kind: 'component'
  name: string
  descriptionHtml: string
  props: PropType[]
  data: Tag[]
  css: Tag[]
}

export type SimpleApiReference = {
  kind: 'simple'
  name: string
  type: string
}

export type PropType = {
  name: string
  defaultHtml: string | null
  type: string
  descriptionHtml: string
  isFunction: boolean
}

export type Tag = {
  name: string
  descriptionHtml: string
}

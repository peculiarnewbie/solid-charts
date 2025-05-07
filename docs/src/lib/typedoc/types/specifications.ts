export type TypeSpecification =
  | ComponentTypeSpecification
  | SimpleTypeSpecification

export type ComponentTypeSpecification = {
  kind: 'component'
  name: string
  sorting: string[]
}

export type SimpleTypeSpecification = {
  kind: 'simple'
  name: string
}

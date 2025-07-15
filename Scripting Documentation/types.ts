
export type DocItem = {
  title: Record<string, string>,
  subtitle?: Record<string, string>
  keywords?: string[]
  example?: string
  readme?: string
  children?: DocItem[]
}
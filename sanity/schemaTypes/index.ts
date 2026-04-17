import { type SchemaTypeDefinition } from 'sanity'

import { projectType } from './project'
import { experienceType } from './experience'
import { articleType } from './article'
import { openSourceType } from './openSource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, experienceType, articleType, openSourceType],
}

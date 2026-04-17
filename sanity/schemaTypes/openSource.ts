import { defineField, defineType } from 'sanity'

export const openSourceType = defineType({
  name: 'openSource',
  title: 'Open Source Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Repository Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lang',
      title: 'Language',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Repository Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

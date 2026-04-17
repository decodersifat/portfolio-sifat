import { defineField, defineType } from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience & Achievements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Current Role', value: 'current' },
          { title: 'Past Role', value: 'past' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Professional Experience', value: 'professional' },
          { title: 'Award / Achievement', value: 'achievement' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

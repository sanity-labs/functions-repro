import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'hello-function',
      event: {
        on: ['create', 'update'],
        filter: "_type == 'skill' && !(_id in path('drafts.**')) && delta::changedAny((skillName, description, content, references))",
        projection: `{
          _id,
          _type,
          skillName,
          description,
          content,
          references[]->{filename, content}
        }`,
      },
    }),
  ],
})

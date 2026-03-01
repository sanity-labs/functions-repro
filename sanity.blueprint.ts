import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'hello-function',
      event: {
        on: ['create', 'update'],
        filter: "_type == 'post'",
      },
    }),
  ],
})

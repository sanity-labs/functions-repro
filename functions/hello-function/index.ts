import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({event}) => {
  console.log('Event received:', event.data?._type, event.data?._id)
})

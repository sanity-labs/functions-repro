import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({event}) => {
  const skill = event.data
  console.log(`Skill published: ${skill?.skillName} (${skill?._id})`)
  console.log(`References: ${skill?.references?.length ?? 0}`)
  console.log('Event received successfully — @sanity/functions import works!')
})

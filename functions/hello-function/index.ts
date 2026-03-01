import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({event}) => {
  const skill = event.data
  console.log('Event received:', skill?._type, skill?._id)
  console.log('Skill name:', skill?.skillName)
  console.log('References:', skill?.references?.length ?? 0)
})

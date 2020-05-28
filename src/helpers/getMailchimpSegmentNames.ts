const getSegmentIds = (
  segments: Record<string, string>[],
): Record<string, string> => {
  const segmentIds: Record<string, string> = {}

  segments.forEach((segment) => {
    segmentIds[segment.name] = segment.id
  })

  return segmentIds
}

export default getSegmentIds

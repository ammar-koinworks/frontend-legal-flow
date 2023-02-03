export const userSelectMapping = (data) => {
  return data?.map(v => ({
    'id': v.id,
    'name': `${v.fullname} - ${v.position?.name}`
  })).sort((a, b) => (a.name > b.name) ? 1 : -1)
}
// Toggle sort order - Asc / Desc
const sortAscDescClick = useCallback(() => {
  setAscDescSort(ascDesc === true ? false : true)
  setAllPosts(allPosts.reverse())
}, [ascDesc, allPosts])

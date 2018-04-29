const search = (state = initialState.search, action) => {
	switch (action.type) {
		case 'SEARCH_REQUEST':
			return {
				...state,
				city: action.city,
				sortBy: action.sortBy,
				loading: true
			};
		case 'SEARCH_SUCCESS':
			return {
				...state,
				searchList: action.searchList,
				error: '',
				loading: false
			};
		case 'SEARCH_FAILURE':
			return {
				...state,
				error: action.error,
				searchList: [],
				loading: false
			};
		default:
			return state;
	}
}

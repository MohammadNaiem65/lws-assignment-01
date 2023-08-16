// Action identifiers
const INCREMENT = 'increment-score';
const DECREMENT = 'decrement-score';
const INSERT = 'insert-score';
const DELETE = 'delete-score';
const RESET = 'reset-score';

// initial value
const initialScore = [
	{
		id: 1,
		score: 0,
	},
];

// * Reducer function
const matchReducer = (state = initialScore, action) => {
	switch (action.type) {
		// ! In case of increment
		case INCREMENT:
			let incrementScore = state.map((match) => {
				if (match.id === parseInt(action.payload.id)) {
					return {
						...action,
						score: match.score + parseInt(action.payload.value),
					};
				} else {
					return match;
				}
			});
			return incrementScore;

		// ! In case of decrement
		case DECREMENT:
			let decrementScore = state.map((match) => {
				if (match.id === parseInt(action.payload.id)) {
					return {
						...action,
						score: match.score - parseInt(action.payload.value),
					};
				} else {
					return match;
				}
			});
			return decrementScore;

		// ! In case of insert new match
		case INSERT:
			const newId =
				initialScore.reduce(
					(maxId, currId) => Math.max(maxId, currId),
					0
				) + 1;
			return [
				...state,
				{
					id: newId,
					score: 0,
				},
			];

		// ! In case of delete existing match
		case DELETE:
			let restMatches = state.filter(
				(match) => match.id !== action.payload.id
			);
			return restMatches;

		// ! In case of no case get matched
		case RESET:
			const newState = state.map((match) => {
				return {
					...match,
				};
			});
			return newState;

		// ! In case of no case get matched
		default:
			return state;
	}
};

// Create store
const store = Redux.createStore(matchReducer);

// Subscribe store
store.subscribe();

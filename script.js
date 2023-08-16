// ! Get DOM elements
const matchContainer = document.getElementsByClassName('all-matches')[0];
const addMatchBtn = document.getElementsByClassName('btn lws-addMatch')[0];
const resetBtn = document.getElementsByClassName('lws-reset')[0];

// Action identifiers
const INCREMENT = 'increment-score';
const DECREMENT = 'decrement-score';
const INSERT = 'insert-score';
const DELETE = 'delete-score';
const RESET = 'reset-score';

// Action creators
function increment(data) {
	return {
		type: INCREMENT,
		payload: {
			id: data.id,
			value: data.value,
		},
	};
}

function decrement(data) {
	return {
		type: DECREMENT,
		payload: {
			id: data.id,
			value: data.value,
		},
	};
}

function insertMatch() {
	return {
		type: INSERT,
	};
}

function deleteMatch(id) {
	return { type: DELETE, payload: { id } };
}

function reset() {
	return {
		type: RESET,
	};
}

// initial value
const initialScore = [
	{
		id: 1,
		score: 120,
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
						...match,
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
						...match,
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
				state.reduce((maxId, curr) => Math.max(maxId, curr.id), 0) + 1;
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
				(match) => match.id !== parseInt(action.payload.id)
			);
			return restMatches;

		// ! In case of no case get matched
		case RESET:
			const newState = state.map((match) => {
				return {
					...match,
					score: 0,
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

// ! Event handlers
function handleDeleteMatch(btn) {
	store.dispatch(deleteMatch(btn.dataset.id));
}

function handleIncrement(e) {
	e.preventDefault();
	const field = e.target.increment;
	const fieldData = {
		id: field.dataset.id,
		value: field.value,
	};

	store.dispatch(increment(fieldData));
}

function handleDecrement(e) {
	e.preventDefault();
	const field = e.target.decrement;
	const fieldData = {
		id: field.dataset.id,
		value: field.value,
	};
	store.dispatch(decrement(fieldData));
}

addMatchBtn.addEventListener('click', () => {
	store.dispatch(insertMatch());
});

resetBtn.addEventListener('click', () => {
	store.dispatch(reset());
});

function matchHtml(match) {
	return `<div class="match">
					<div class="wrapper">
						<button
							onclick="handleDeleteMatch(this)"
							class="lws-delete"
							data-id="${match.id}">
							<img src="./image/delete.svg" alt="" />
						</button>
						<h3 class="lws-matchName">Match ${match.id}</h3>
					</div>
					<div class="inc-dec">
						<form
							onsubmit="handleIncrement(event)"
							class="incrementForm">
							<h4>Increment</h4>
							<input
								type="number"
								name="increment"
								data-id="${match.id}"
								class="lws-increment" />
						</form>
						<form
							onsubmit="handleDecrement(event)"
							class="decrementForm">
							<h4>Decrement</h4>
							<input
								type="number"
								name="decrement"
								data-id="${match.id}"
								class="lws-decrement" />
						</form>
					</div>
					<div class="numbers">
						<h2 id="result1" class="lws-singleResult">${match.score}</h2>
					</div>
				</div>`;
}

function render() {
	const state = store.getState();
	let containerEl = ``;
	state.map((match) => (containerEl += matchHtml(match)));
	matchContainer.innerHTML = containerEl;
}

render();

// Subscribe store
store.subscribe(render);

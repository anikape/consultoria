export const typeReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return [...state, payload];

    case "remove":
      return state.filter(item => item._id !== payload);

    case "edit":
      return state.map(item =>
        item._id === payload._id
          ? { ...item, description: payload.description }
          : item
      );

    case "load":
      return payload;

    default:
      return state;
  }
};

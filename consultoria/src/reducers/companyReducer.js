export const clientReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "remove":
      return state.filter((client) => client.id !== action.payload.id);

    case "edit":
      return state.map((client) =>
        client.id === action.payload.id
          ? { ...client, ...action.payload.data }
          : client
      );

    case "load":
      return action.payload;

    default:
      return state;
  }
};

export const clientReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return { ...state, payload };

    case "remove":
      return state.filter((client) => client.id !== payload.id);

    case "edit":
      return state.map((client) =>
        client.id === payload.id ? { ...client, ...payload } : client
      );

    case "load":
      return payload;

    default:
      return state;
  }
};

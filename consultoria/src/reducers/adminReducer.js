export const adminReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return [...state, payload];

    case "remove":
      return state.filter((admin) => admin.id !== payload.id);

    case "edit":
      return state.map((admin) =>
        admin.id === payload.id ? { ...admin, ...payload.data } : admin
      );

    case "load":
      return payload;

    default:
      return state;
  }
};

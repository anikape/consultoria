export const companyReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "add":
      return { ...state, payload };

    case "remove":
      return state.filter((company) => company.id !== payload.id);

    case "edit":
      return state.map((company) =>
        company.id === payload.id ? { ...company, ...payload } : company
      );

    case "load":
      return payload;

    default:
      return state;
  }
};

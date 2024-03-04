export const Option = (data) => {
  return (
    <>
      {data?.map(({ id, name }) => (
        <option key={id} value={id} disabled={data ? "" : "disabled"}>
          {data ? name : "carregando..."}
        </option>
      ))}
    </>
  );
};

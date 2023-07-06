export const FormQuickSearch = () => {
  return (
    <form>
      <div class="inline-block p-0.5">
        <select
          class="p-0.5 border-solid border-2 border-gray-300 rounded-md"
          name=""
          id=""
        >
          <option value="name">Person Name</option>
          <option value="icNo">IC No</option>
        </select>
      </div>
      <div class="inline-block p-0.5">
        <input
          class="p-0.5 border-solid border-2 border-gray-300 focus:border-sky-500 rounded-md"
          type="text"
          value="test"
        />
      </div>
      <div class="inline-block p-0.5">
        <input
          class="mt-2 px-3 py-0.5 border-2 rounded-md text-white bg-sky-700 hover:text-slate-500 hover:bg-sky-300 hover:transition-all"
          type="submit"
          value="search"
        />
      </div>
    </form>
  );
};

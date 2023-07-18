import { consoleDebug } from "../../util/Console.ts";

interface ITable<Item> {
  headers: string[];
  payload: Item[];
  selectedItem?: Item;
  showAction?: boolean;
  viewItem?: (item: Item) => void;
  editItem?: (item: Item) => void;
}

export default function EntityTable(props: ITable<any>) {
  const { headers, showAction, payload, selectedItem, viewItem, editItem } =
    props;
  consoleDebug("tracing islands/Profile/EntityTable, props: ", props, []);
  return (
    <table>
      <thead class="bg-sky-200">
        <tr>
          {headers.map((item) => {
            return <th>{item}</th>;
          })}

          {showAction && <th>Actions </th>}
        </tr>
      </thead>
      <tbody>
        {payload.map((item: any) => {
          return (
            <tr class={item === selectedItem ? "bg-yellow-300" : "bg-sky-50"}>
              <td>{item.entityId}</td>
              <td>{item.entityName}</td>
              <td>{item.entityIc}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              <td>{item.officeNo}</td>
              {showAction && (
                <td>
                  <button
                    class="px-1 py-0.5 border rounded-md text-white bg-sky-700"
                    onClick={() => {
                      if (viewItem) viewItem(item);
                    }}
                  >
                    View
                  </button>
                  <button
                    class="px-1 py-0.5 border rounded-md text-white bg-sky-700"
                    onClick={() => {
                      if (editItem) editItem(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

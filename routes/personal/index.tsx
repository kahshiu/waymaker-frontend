import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "#components/NavList.tsx";
import { GlobalFrame } from "#components/globals/GlobalFrame.tsx";
import Personal from "#islands/forms/Personal.tsx";
import { backendApi, createUrl } from "#util/globals.ts";
import { consoleDebug } from "#util/Console.ts";
import { ConsoleTags } from "#util/globalEnums.ts";

interface IReturned {
  status: string;
  payload: any;
}

export const handler: Handlers<any | null> = {
  async GET(req, context) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") || "0";

    const statesResp = await fetch(`${backendApi}/definitions/states`);
    if (statesResp.status === 404) {
      return context.render(null);
    }
    const statesData = await statesResp.json();

    let entityData: any = { status: "BLANK", payload: {} };
    if (id && Number(id) > 0) {
      const entityResp = await fetch(`${backendApi}/individual?id=${id}`);
      if (entityResp.status === 404) {
        return context.render(null);
      }
      entityData = await entityResp.json();
    }

    return context.render({ entityData, statesData });
  },

  async POST(req, context) {
    const formData = await req.formData();
    const json = Object.fromEntries(formData);
    const id = formData.get("entityId");
    consoleDebug("tracing personal POST, json: ", { json }, [
      ConsoleTags.PERSONAL,
    ]);

    const method = id && Number(id) > 0 ? "PATCH" : "POST";
    const entityResp = await fetch(`${backendApi}/individual`, {
      method,
      body: JSON.stringify(json),
    });
    const entityData = await entityResp.json();
    const entityId = entityData?.payload?.entityId;

    // Redirect to edit page
    const headers = new Headers();
    headers.set("location", `/personal?id=${entityId}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },

  /*
  async POST(req, ctx) {
    const form = await req.formData();
    const entityName = form.get("name")?.toString();

    const resp = await fetch(`http://backend:8000/individual/1`, {
      method: "CREATE",
      body: JSON.stringify({ entityName }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Add email to list.

  },
  */
};

const NoteAtCreation = () => {
  return (
    <div>
      <div class="text-lg font-bold">Note:</div>
      <div>You can attach services to person after saving details.</div>
    </div>
  );
};
function NoteAtEdit() {
  return (
    <div>
      <div class="text-lg font-bold">Note:</div>
      <div>Personal has no services attached. Create one now</div>
    </div>
  );
}

export default function Index(props: PageProps) {
  const url = new URL(props.url);
  const id = url.searchParams.get("id");

  const navListSidebar1: INavListItem[] = [];
  const navListSidebar2: INavListItem[] = [];

  navListSidebar1.push({
    href: createUrl("personal/service", url.searchParams),
    itemText: "New Service",
  });

  navListSidebar2.push({
    href: createUrl("personal/service", url.searchParams),
    itemText: "New Service",
  });

  /*
    { href: "", itemText: "asdf" },
    { href: "", itemText: "asdf" },
    { href: "", itemText: "asdf" },
    */

  const { entityData } = props.data;
  const isBlank = entityData.status === "BLANK";

  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={navListSidebar1} listClassName="nav-list-col" />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8 font-bold text-lg">
            {isBlank ? "New Personal" : "Edit Personal"}
          </div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12">
              <Personal payload={props.data} />
            </article>

            <article class="w-4/12">
              <div class="sticky top-24 w-full px-4 py-2">
                {isBlank ? <NoteAtCreation /> : <NoteAtEdit />}
              </div>
            </article>
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

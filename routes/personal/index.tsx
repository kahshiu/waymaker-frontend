import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "#components/NavList.tsx";
import { GlobalFrame } from "#components/globals/GlobalFrame.tsx";
import Personal from "#islands/forms/Personal.tsx";
import { backendApi } from "../../util/globals.ts";

interface IReturned {
  status: string;
  payload: any;
}

export const getIndividual = async (): Promise<IReturned> => {
  // const { id } = context.params;
  // const resp = await fetch(`${backendApi}/individual/${id}`);
  /*
  if (resp.status === 404) {
    return {
      status: "ERROR",
      payload: {},
    };
  }

  return await resp.json();
  */
};

export const handler: Handlers<any | null> = {
  async GET(req, context) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") || "0";
    const respForm = await fetch(`${backendApi}/individual/${id}`);
    if (respForm.status === 404) {
      return context.render(null);
    }

    const respStates = await fetch(`${backendApi}/definitions/states`);
    if (respStates.status === 404) {
      return context.render(null);
    }

    const dataForm = await respForm.json();
    const dataStates = await respStates.json();
    return context.render({
      status: "OK",
      payload: {
        form: dataForm.payload,
        states: dataStates.payload,
      },
    });
  },

  async POST(req, context) {
    const formData = await req.formData();
    const json = Object.fromEntries(formData);
    await fetch(`${backendApi}/individual`, {
      method: "PATCH",
      body: JSON.stringify(json),
    });

    // Redirect user to thank you page.
    const headers = new Headers();
    const id = formData.get("entityId");
    headers.set("location", `/personal?id=${id}`);
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

    console.log("tracing entityName: ", resp);
    // Add email to list.

  },
  */
};

export default function Home(props: PageProps) {
  const navListSidebar: INavListItem[] = [
    { href: "", itemText: "asdf" },
    { href: "", itemText: "asdf" },
    { href: "", itemText: "asdf" },
    { href: "", itemText: "asdf" },
  ];

  const { status, payload } = props.data;
  const isBlank = status === "BLANK";

  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={navListSidebar} />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8 font-bold text-lg">
            {isBlank ? "New Personal" : "Edit Personal"}
          </div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12">
              <Personal payload={payload} />
            </article>

            <article class="w-4/12">
              <div class="sticky top-24 w-full px-4 py-2">
                afasdf Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur?
              </div>
            </article>
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

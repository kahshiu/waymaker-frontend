import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "#components/NavList.tsx";
import { GlobalFrame } from "#components/globals/GlobalFrame.tsx";
import Personal from "#islands/forms/Personal.tsx";

export const handler: Handlers<any | null> = {
  async GET(req, context) {
    const { id } = context.params;
    // const resp = await fetch(`https://api.github.com/users/${username}`);
    const resp = await fetch(`http://backend-api:8000/api/individual/1`);
    console.log(resp);

    if (resp.status === 404) {
      return context.render(null);
    }
    const user = await resp.json();
    console.log(user);
    return context.render(user);
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

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
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

  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={navListSidebar} />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8 font-bold text-lg">Personal</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12">
              <Personal payload={props.data.payload} />
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

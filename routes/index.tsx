import { Handlers, PageProps } from "$fresh/server.ts";
import FormIndividual from "../islands/FormIndividual.tsx";
import { GlobalFrame } from "../components/globals/GlobalFrame.tsx";

export const handler: Handlers<any | null> = {
  /*
  async GET(_, ctx) {
    const { username } = ctx.params;
    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // const resp = await fetch(`http://backend:8000/individual/1`);

    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user = await resp.json();
    return ctx.render(user);
  },
  */
  async POST(req, ctx) {
    const form = await req.formData();
    const entityName = form.get("name")?.toString();

    const resp = await fetch(`http://backend:8000/individual/1`, {
      method: "PATCH",
      body: JSON.stringify({ entityName }),
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
};

export default function Home(incoming: PageProps) {
  return (
    <GlobalFrame>
      <FormIndividual />
    </GlobalFrame>
  );
}

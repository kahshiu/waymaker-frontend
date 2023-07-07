import { HandlerContext } from "$fresh/server.ts";
import { backendApi } from "../../util/globals.ts";

export const handler = async (
  req: Request,
  context: HandlerContext
): Promise<Response> => {
  // const { id } = context.params;
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || "0";
  const resp = await fetch(`${backendApi}/individual/${id}`);

  if (resp.status === 404) {
    return context.render(null);
  }

  const data = await resp.json();
  console.log("tracing from personal", data);
  return new Response(JSON.stringify(data));
};

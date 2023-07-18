import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "#components/NavList.tsx";
import { GlobalFrame } from "#components/globals/GlobalFrame.tsx";
import { backendUrl, webUrl } from "#util/globals.ts";
import SetupGoogle from "../../islands/forms/SetupGoogle.tsx";
import { consoleDebug } from "../../util/Console.ts";

export const handler: Handlers<any | null> = {
  async GET(req, context) {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (action === "verify") {
      const resp = await fetch(backendUrl("google/refresh"));
      const payload = { result: "verify_failed", additional: {} };
      consoleDebug("tracing google, result: ", resp, []);
      if (resp.status === 200) {
        const json = await resp.json();
        payload.result = "verify_success";
        payload.additional = json.payload;
      }
      return context.render(payload);
    } else if (action === "userDetails") {
      const resp = await fetch(backendUrl("google/userDetails"));
      const payload = { result: "details_failed", additional: {} };
      if (resp.status === 200) {
        const json = await resp.json();
        payload.result = "details_success";
        payload.additional = json.payload.userDetails;
      }
      return context.render(payload);
    } else if (action === "testMail") {
      const resp = await fetch(backendUrl("mail/test"));
      consoleDebug("tracing google, payload:", resp, []);
      const payload = { result: "test_mail_failed", additional: {} };
      if (resp.status === 200) {
        const json = await resp.json();
        payload.result = "test_mail_success";
        payload.additional = json.payload;
      }
      return context.render(payload);
    } else {
      return context.render({ result: null, additional: {} });
    }
  },
  // async POST(req, context) {},
};

export default function Home(props: PageProps) {
  const url = new URL(props.url);
  consoleDebug("tracing google, props.data: ", props.data, []);

  const result = url.searchParams.get("result") || props.data?.result;
  const additional = props.data.additional;
  consoleDebug("tracing google, result: ", result, []);

  const sidebar1: INavListItem[] = [{ itemText: "<< Home", href: webUrl("") }];
  const sidebar2: INavListItem[] = [
    { itemText: "Google", href: webUrl("setup/google") },
  ];

  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={sidebar1} />
          <br />
          <NavList list={sidebar2} />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8 font-bold text-lg">Google Account</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <SetupGoogle result={result} additional={additional} />
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

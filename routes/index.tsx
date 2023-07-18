import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "../components/NavList.tsx";
import { contextGetField } from "../components/form/FormContext.ts";
import { GlobalFrame } from "../components/globals/GlobalFrame.tsx";
import Personal from "../islands/forms/Personal.tsx";
import { consoleDebug } from "../util/Console.ts";
import { ConsoleTags } from "../util/globalEnums.ts";
import { webUrl } from "../util/globals.ts";

export const handler: Handlers<any | null> = {
  // async GET(req, context) {},
  // async POST(req, context) {},
};

export default function Home(incoming: PageProps) {
  const navListSidebar: INavListItem[] = [
    { itemText: "Profile", href: webUrl("profile") },
    { itemText: "asdf", href: "" },
  ];
  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={navListSidebar} />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8">breadcrumb</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12"></article>

            <article class="w-4/12">
              <div class="sticky top-24 w-full px-4 py-2"></div>
            </article>
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

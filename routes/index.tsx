import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "../components/NavList.tsx";
import { contextGetField } from "../components/form/FormContext.ts";
import { GlobalFrame } from "../components/globals/GlobalFrame.tsx";
import Personal from "../islands/forms/Personal.tsx";
import { consoleDebug } from "../util/Console.ts";
import { ConsoleTags } from "../util/globalEnums.ts";

export const handler: Handlers<any | null> = {
  // async GET(req, context) {},
  // async POST(req, context) {},
};

export default function Home(incoming: PageProps) {
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
          <div class="ml-8">breadcrumb</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12">
              <Personal />
            </article>

            <article class="w-4/12">
              <div class="sticky top-24 w-full px-4 py-2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
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

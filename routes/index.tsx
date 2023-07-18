import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "../components/NavList.tsx";
import { GlobalFrame } from "../components/globals/GlobalFrame.tsx";
import { webUrl } from "../util/globals.ts";

export const handler: Handlers<any | null> = {
  // async GET(req, context) {},
  // async POST(req, context) {},
};

export default function Home(incoming: PageProps) {
  const userSidebar: INavListItem[] = [
    { itemText: "Profile", href: webUrl("profile") },
  ];
  const adminSidebar: INavListItem[] = [
    { itemText: "Setup", href: webUrl("setup/google") },
    { itemText: "Schedules", href: webUrl("schedules") },
    { itemText: "Tasks", href: webUrl("tasks") },
    { itemText: "Templates", href: webUrl("templates") },
  ];
  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={userSidebar} />
          <br />
          <h5>Admin</h5>
          <NavList list={adminSidebar} />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8">breadcrumb</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <article class="w-8/12">
              <div class="h-max">
                <h5>Admin</h5>
                <p></p>
              </div>
            </article>
            <article class="w-4/12">
              <div class="sticky top-24 w-full px-4 py-2"></div>
            </article>
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

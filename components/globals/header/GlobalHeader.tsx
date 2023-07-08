import { INavListItem, NavList } from "../../NavList.tsx";
import { FormLogout } from "./FormLogout.tsx";
import { FormQuickSearch } from "./FormQuickSearch.tsx";

export const GlobalHeader = () => {
  const navListTop: INavListItem[] = [
    { href: "", itemText: "Home", itemClassName: "nav-item-blue-100" },
    { href: "", itemText: "Profile", itemClassName: "nav-item-blue-100" },
    { href: "", itemText: "Reports", itemClassName: "nav-item-blue-100" },
  ];
  return (
    <div class="fixed top-0 flex flex-col w-full h-24 z-50 px-10 pb-0 bg-sky-400">
      <h1>
        Waymaker - <span class="title-sm">Customer Management System</span>
      </h1>
      <div class="mt-auto">
        <div class="flex flex-row">
          <nav class="grow mt-auto">
            {/*
            <NavList list={navListTop} listClassName="nav-list-row" />
            */}
          </nav>
          <div class="grow mb-1 text-sm text-black text-right">
            {/*
            <div class="inline-block">
              <FormQuickSearch />
            </div>
            <div class="inline-block pl-2">
              <FormLogout />
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

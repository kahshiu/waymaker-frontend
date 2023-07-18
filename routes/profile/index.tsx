import _ from "lodash";
import { Handlers, PageProps } from "$fresh/server.ts";
import { INavListItem, NavList } from "#components/NavList.tsx";
import { GlobalFrame } from "#components/globals/GlobalFrame.tsx";
import { backendApi, backendUrl, webUrl } from "#util/globals.ts";
import { EntityType } from "../../components/form/Enums.ts";
import Profile from "../../islands/forms/Profile.tsx";
type TFnFilter<itemIn, itemOut> = (
  obj: Record<string, itemIn>,
  fn: (index: string, item: itemIn) => boolean
) => Record<string, itemOut>;

const filterObj: TFnFilter<any, any> = (obj, fn) => {
  const result: any = {};

  for (const key in obj) {
    const temp = fn(key, obj[key]);
    if (temp) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const handler: Handlers<any | null> = {
  async GET(req, context) {
    const url = new URL(req.url);
    const entityName = url.searchParams.get("entityName");
    const entityIc = url.searchParams.get("entityIc");
    const mobileNo = url.searchParams.get("mobileNo");
    const email = url.searchParams.get("email");

    // NOTE: query person
    const qsPerson1 = {
      entityType: EntityType.INDIVIDUAL,
      entityIc,
      entityName,
      mobileNo,
      email,
    };
    const qsPerson2 = filterObj(qsPerson1, (key, value) => !_.isNil(value));
    const qsPerson = new URLSearchParams(qsPerson2);
    let personData: any = { status: "BLANK", payload: {} };
    const personResp = await fetch(
      `${backendApi}/entity/search?${qsPerson.toString()}`
    );
    personData = await personResp.json();

    // NOTE: query company
    const qsCompany1 = {
      entityType: EntityType.COMPANY,
      entityIc,
      entityName,
      mobileNo,
      email,
    };
    const qsCompany2 = filterObj(qsCompany1, (key, value) => !_.isNil(value));
    const qsCompany = new URLSearchParams(qsCompany2);
    let companyData: any = { status: "BLANK", payload: {} };
    const companyResp = await fetch(
      `${backendApi}/entity/search?${qsCompany.toString()}`
    );
    companyData = await companyResp.json();

    // NOTE: query states
    const statesResp = await fetch(backendUrl("definitions/states"));
    if (statesResp.status === 404) {
      return context.render(null);
    }
    const statesData = await statesResp.json();

    return context.render({ qsPerson1, personData, companyData, statesData });
  },
};

export default function Index(props: PageProps) {
  const url = new URL(props.url);
  const navListSidebar1: INavListItem[] = [];
  navListSidebar1.push({
    itemText: "<< Home",
    href: webUrl(""),
  });

  const navListSidebar2: INavListItem[] = [];
  navListSidebar2.push(
    {
      itemText: "New Personal",
      href: webUrl("profile/personal", url.searchParams),
    },
    {
      itemText: "New Company",
      href: webUrl("profile/company", url.searchParams),
    },
    { itemText: "New Service", href: webUrl("", url.searchParams) }
  );
  const { qsPerson1, personData, companyData, statesData } = props.data;

  return (
    <GlobalFrame>
      <div class="frame-form">
        <nav class="float-left sticky top-24 w-52 pt-4">
          <NavList list={navListSidebar1} listClassName="nav-list-col" />
          <br />
          <NavList list={navListSidebar2} listClassName="nav-list-col" />
        </nav>

        <article class="flex flex-col mt-28">
          <div class="ml-8 font-bold text-lg">Search Entities</div>
          <div class="flex flex-row mx-4 px-4 py-2">
            <Profile
              qsPerson1={qsPerson1}
              personData={personData}
              companyData={companyData}
              statesData={statesData}
            />
          </div>
        </article>
      </div>
    </GlobalFrame>
  );
}

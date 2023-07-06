import { useSignal, useComputed } from "@preact/signals";
import { INavListItem, NavList } from "../components/NavList.tsx";
import {
  contextAddField,
  contextGetField,
  contextNew,
} from "../components/form/FormContext.ts";
import InputText from "../components/form/InputText.tsx";
import Textarea from "../components/form/Textarea.tsx";
import {
  ColumnCount,
  EntityType,
  IdType,
  SelectedCount,
} from "../components/form/Enums.ts";
import { defaultComputedDisabled } from "../components/form/Defaults.ts";
import GroupedOptions from "../components/form/GroupedOptions.tsx";
import Select from "../components/form/Select.tsx";
import { errorWhenLengthLessThan } from "../components/form/fn/errorsBasic.ts";
import {
  MYIdentiyCardMasking,
  MYPhoneMasking,
} from "../components/form/fn/maskings.ts";
import {
  errorIC,
  errorName,
  errorPhoneNo,
  errorPostcode,
} from "../components/form/fn/errorsSpecial.ts";
import {
  isMandatory,
  withPrecondition,
} from "../components/form/fn/validators.ts";

const navListSidebar: INavListItem[] = [
  { href: "", itemText: "asdf" },
  { href: "", itemText: "asdf" },
  { href: "", itemText: "asdf" },
  { href: "", itemText: "asdf" },
];

export default function F1(incoming: any) {
  const formContext = contextNew();

  contextAddField(formContext, "entityName", {
    label: "Name",
    description: "Name of individual",
    data: "",
    errorConditions: errorName,
  });
  contextAddField(formContext, "idNo", {
    label: "IC No",
    description: "Malaysian IC No",
    data: "",
    fnMasking: MYIdentiyCardMasking,
    errorConditions: errorIC.map(withPrecondition(isMandatory)),
  });

  contextAddField(formContext, "mobileNo", {
    label: "Mobile No",
    data: "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorIC.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "officeNo", {
    label: "Office No",
    data: "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorIC.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "email", {
    label: "Email",
    data: "",
    fnMasking: MYPhoneMasking,
    errorConditions: [],
  });

  contextAddField(formContext, "address1", {
    label: "Address1",
    data: "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "address2", {
    label: "Address2",
    data: "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "address3", {
    label: "Address3",
    data: "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });

  contextAddField(formContext, "postcode", {
    label: "Postcode",
    data: "",
    errorConditions: errorPostcode,
  });
  contextAddField(formContext, "city", {
    label: "City",
    data: "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "state", {
    label: "State",
    data: "",
    errorConditions: [],
  });

  contextAddField(formContext, "note", {
    label: "Notes",
    data: "",
    disabledConditions: [],
  });

  return (
    <div class="frame-form">
      <nav class="float-left sticky top-24 w-52 pt-4">
        <NavList list={navListSidebar} />
      </nav>

      <article class="flex flex-col mt-28">
        <div class="ml-8">breadcrumb</div>
        <div class="flex flex-row mx-4 px-4 py-2">
          <article class="w-8/12">
            <form class="form">
              <fieldset class="form-fieldset">
                <legend class="form-legend">Personal Details</legend>

                <div class="form-row">
                  <input
                    type="hidden"
                    name="entityType"
                    value={EntityType.INDIVIDUAL}
                  />
                  <InputText
                    fieldName={"entityName"}
                    formContext={formContext}
                  />
                </div>
                <div class="form-row">
                  <input type="hidden" name="idType" value={IdType.IC_NO} />
                  <InputText fieldName={"idNo"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"mobileNo"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"officeNo"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"email"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"address1"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"address2"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"address3"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"postcode"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <InputText fieldName={"city"} formContext={formContext} />
                </div>
                <div class="form-row">
                  <Select
                    options={[
                      { labelName: "Monday", value: "mon" },
                      { labelName: "Tuesday", value: "tue" },
                    ]}
                    fieldName={"state"}
                    formContext={formContext}
                  />
                </div>

                {/*
                <div class="mx-3 my-1">
                  <label class="inline-block w-52 align-top">browsers:</label>
                  <div class="inline-block w-72">
                    <input
                      type="text"
                      list="browsers"
                      name="browser"
                      id="browser"
                      class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg"
                      value="test"
                    />
                    <datalist id="browsers">
                      <option value="edge">edge</option>
                      <option value="firefox">firefox</option>
                      <option value="chrome">chrome</option>
                      <option value="opera">opera</option>
                    </datalist>
                  </div>
                </div>

                <div class="form-row">
                  <GroupedOptions
                    selectedCount={SelectedCount.SINGLE}
                    columnCount={ColumnCount.THREE}
                    fieldName="fav2"
                    formContext={formContext}
                    fnDisabledValue={(value, fieldContext, formContext) => {
                      if (value === "lemon")
                        return { isDisabled: true, message: "sdfasdf" };
                      return defaultComputedDisabled;
                    }}
                    options={[
                      { value: "lemon", labelName: "Lemon" },
                      { value: "apple", labelName: "Apple" },
                      { value: "banana", labelName: "Banana" },
                    ]}
                  />
                </div>

                <div class="form-row">
                  <Textarea
                    fieldName="comments"
                    formContext={formContext}
                  ></Textarea>
                </div>

                <div class="form-row">
                  <GroupedOptions
                    selectedCount={SelectedCount.MULTIPLE}
                    fieldName="favourites"
                    formContext={formContext}
                    fnDisabledValue={(value, fieldContext, formContext) => {
                      if (value === "lemon")
                        return { isDisabled: true, message: "sdfasdf" };
                      return defaultComputedDisabled;
                    }}
                    options={[
                      { value: "lemon", labelName: "Lemon" },
                      { value: "apple", labelName: "Apple" },
                      { value: "banana", labelName: "Banana" },
                      { value: "pineapple", labelName: "Pineapple" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "watermelon", labelName: "Watermelon" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                      { value: "mango", labelName: "Mango" },
                    ]}
                  />
                </div>
*/}
              </fieldset>

              <br />
              <fieldset class="form-fieldset">
                <legend class="form-legend">something Details</legend>
              </fieldset>

              <div class="mx-3 my-1">
                <div class="content-right">
                  <input
                    type="submit"
                    class="mt-2 px-3 py-1 border rounded-lg w-52 text-white bg-sky-700 hover:text-slate-500 hover:bg-sky-300 hover:transition-all"
                    value="submit"
                  />
                </div>
              </div>
            </form>
          </article>

          <article class="w-4/12">
            <div class="sticky top-24 w-full px-4 py-2">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur?
            </div>
          </article>
        </div>
      </article>
    </div>
  );
}

/*
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        {payload && 
          <form method="post">
            <input type="text" name="name" value={payload.entity_name} />
            <button type="submit">Submit</button>

            <p class="my-6"> {payload.entity_id} </p>
            <p class="my-6"> {payload.entity_name} </p>
            <p class="my-6"> {payload.contact_details} </p>
            <p class="my-6"> {payload.address_city} </p>
            <p class="my-6"> {payload.address_state} </p>
          </form>
        }

        <p class={"mx-auto max-w-screen-md"}>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter count={count} />
      </div>
*/

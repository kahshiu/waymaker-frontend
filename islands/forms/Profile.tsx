import { useState } from "preact/hooks";
import Table from "../../components/blocks/Table.tsx";
import {
  contextNew,
  contextAddField,
} from "../../components/form/FormContext.ts";
import InputText from "../../components/form/InputText.tsx";
import { mapMYStates } from "../../components/form/fn/mappings.ts";
import {
  MYIdentiyCardMasking,
  MYPhoneFieldMasking,
  MYPhoneMasking,
} from "../../components/form/fn/maskings.ts";
import { consoleDebug } from "../../util/Console.ts";
import { webUrl } from "../../util/globals.ts";
import { EntityType, IdType } from "../../components/form/Enums.ts";

interface IProfile {
  qsPerson1: any;
  personData: any;
  companyData: any;
  statesData: any;
}

const headers = ["#", "Name", "Ic No", "Email", "Mobile No.", "Office No."];

const displayDetails = (item: any) => {
  const details = [];
  if (item.entityIc?.length > 0 && item.entityIcType == IdType.IC_NO)
    details.push(`Ic no: ${item.entityIc}`);
  if (item.entityIc?.length > 0 && item.entityIcType == IdType.CO_REG_NO)
    details.push(`Co reg no: ${item.entityIc}`);
  if (details.length === 0 && item.entityType == EntityType.INDIVIDUAL)
    details.push("[EMPTY PERSONAL DETAILS]");
  if (details.length === 0 && item.entityType == EntityType.COMPANY)
    details.push("[EMPTY COMPANY DETAILS]");
  return details;
};

const displayContacts = (item: any) => {
  const contact = [];
  if (item.mobileNo) contact.push(`Mobile no: ${item.mobileNo}`);
  if (item.officeNo) contact.push(`Office no: ${item.officeNo}`);
  if (item.email) contact.push(`Email: ${item.email}`);
  if (contact.length === 0) contact.push("[BLANK CONTACTS]");
  return contact;
};

const displayAddress = (item: any) => {
  const address = [];
  const postal = [];
  if (item.address1) address.push(item.address1);
  if (item.address2) address.push(item.address2);
  if (item.address3) address.push(item.address3);
  if (address.length === 0) address.push("[EMPTY ADDRESS]");

  if (item.addressPostcode) postal.push(item.addressPostcode);
  if (item.addressCity) postal.push(item.addressCity);
  if (postal.length === 0) postal.push("[EMPTY POSTAL]");
  return [...address, postal.join(" "), item.addressState];
};

export default function Profile(props: IProfile) {
  const { qsPerson1, personData, companyData, statesData } = props;
  consoleDebug("tracing profile index, entityData: ", personData, []);
  consoleDebug("tracing profile index, statesData: ", statesData, []);

  const payload1 = personData.payload.map((item: any) => {
    return {
      ...item,
      entityIc: MYIdentiyCardMasking(item.entityIc),
      mobileNo: MYPhoneMasking(item.mobileNo),
      officeNo: MYPhoneMasking(item.officeNo),
      addressState: mapMYStates(statesData.payload, item.addressState),
    };
  });
  const payload2 = companyData.payload.map((item: any) => {
    return {
      ...item,
      entityIc: MYIdentiyCardMasking(item.entityIc),
      mobileNo: MYPhoneMasking(item.mobileNo),
      officeNo: MYPhoneMasking(item.officeNo),
      addressState: mapMYStates(statesData.payload, item.addressState),
    };
  });

  const formContext = contextNew();
  contextAddField(formContext, "entityName", {
    label: "Name",
    description: "Name of entity",
    data: qsPerson1.entityName ?? "",
  });
  contextAddField(formContext, "entityIc", {
    label: "IC No/ Co Reg No",
    description: "",
    data: qsPerson1.entityIc ?? "",
  });
  contextAddField(formContext, "mobileNo", {
    label: "Contact No",
    data: qsPerson1.mobileNo ?? "",
    fnMasking: MYPhoneFieldMasking,
  });
  contextAddField(formContext, "email", {
    label: "Email",
    data: qsPerson1.email ?? "",
    errorConditions: [],
  });

  const [selectedEntity, selectEntity] = useState<any>({});

  return (
    <>
      <article class="w-8/12">
        <form class="form" method="GET">
          <fieldset class="form-fieldset">
            <legend class="form-legent">Search By:</legend>
            <div class="form-row">
              <InputText fieldName={"entityName"} formContext={formContext} />
              <InputText fieldName={"entityIc"} formContext={formContext} />
              <InputText fieldName={"mobileNo"} formContext={formContext} />
              <InputText fieldName={"email"} formContext={formContext} />
            </div>
            <div class="mx-3 my-1">
              <div class="content-right">
                <input type="submit" class="button-submit" value="Search" />
              </div>
            </div>
          </fieldset>
        </form>
        <h3>Persons</h3>
        <Table
          headers={headers}
          showAction
          payload={payload1}
          selectedItem={selectedEntity}
          viewItem={(item) => selectEntity(item)}
          editItem={(item) => {
            const qsParams = new URLSearchParams({
              id: item.entityId,
            });
            const href = webUrl("profile/personal", qsParams);
            window.location.href = href;
          }}
        />

        <h3>Companies</h3>
        <Table
          headers={headers}
          showAction
          payload={payload2}
          selectedItem={selectedEntity}
          viewItem={(item) => selectEntity(item)}
          editItem={(item) => {
            const qsParams = new URLSearchParams({
              id: item.entityId,
            });
            const href = webUrl("profile/company", qsParams);
            window.location.href = href;
          }}
        />
      </article>

      <article class="w-4/12">
        <div class="sticky top-24 w-full px-4 py-2">
          {selectedEntity.entityId > 0 && (
            <QuickDisplay selectedEntity={selectedEntity} />
          )}
        </div>
      </article>
    </>
  );
}

interface IQuickDisplay {
  selectedEntity: any;
}
const QuickDisplay = (props: IQuickDisplay) => {
  const { selectedEntity } = props;
  return (
    <div>
      <h3>
        <b>{selectedEntity.entityName}</b>
      </h3>
      <p>
        <hr />
        {displayDetails(selectedEntity).map((item) => {
          return <div>{item}</div>;
        })}
        <br />
        <b>Contact</b>
        {displayContacts(selectedEntity).map((item) => {
          return <div>{item}</div>;
        })}
        <br />
        <hr />
        <b>Address</b>
        <address>
          {displayAddress(selectedEntity).map((item) => {
            return <div>{item}</div>;
          })}
        </address>
      </p>
    </div>
  );
};

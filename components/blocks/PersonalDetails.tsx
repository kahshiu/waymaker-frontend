import { EntityType, IdType } from "../form/Enums.ts";
import { contextAddField } from "../form/FormContext.ts";
import InputText from "../form/InputText.tsx";
import Select from "../form/Select.tsx";
import Textarea from "../form/Textarea.tsx";
import { errorWhenLengthMoreThan } from "../form/fn/errorsBasic.ts";
import {
  errorIC,
  errorName,
  errorPhoneNo,
  errorPostcode,
} from "../form/fn/errorsSpecial.ts";
import { MYIdentiyCardMasking, MYPhoneMasking } from "../form/fn/maskings.ts";
import { withPrecondition, isMandatory } from "../form/fn/validators.ts";
import { IBlockForm } from "./interfaces/IBlockForm.ts";

export default function PersonalDetails(props: IBlockForm<any>) {
  const { formContext, payload } = props;
  const { form, states } = payload;

  contextAddField(formContext, "entityId", {
    label: "Id",
    description: "Personal ID",
    data: form.entityId ?? "",
  });

  contextAddField(formContext, "entityName", {
    label: "Name",
    description: "Name of individual",
    data: form.entityName ?? "",
    errorConditions: errorName,
  });
  contextAddField(formContext, "entityIc", {
    label: "IC No",
    description: "Malaysian IC No",
    data: form.entityIc ?? "",
    fnMasking: MYIdentiyCardMasking,
    errorConditions: errorIC.map(withPrecondition(isMandatory)),
  });

  contextAddField(formContext, "mobileNo", {
    label: "Mobile No",
    data: form.mobileNo ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorPhoneNo.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "officeNo", {
    label: "Office No",
    data: form.officeNo ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorPhoneNo.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "email", {
    label: "Email",
    data: form.email ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: [],
  });

  contextAddField(formContext, "address1", {
    label: "Address1",
    data: form.address1 ?? "",
    errorConditions: [errorWhenLengthMoreThan({ length: 100 })],
  });
  contextAddField(formContext, "address2", {
    label: "Address2",
    data: form.address2 ?? "",
    errorConditions: [errorWhenLengthMoreThan({ length: 100 })],
  });
  contextAddField(formContext, "address3", {
    label: "Address3",
    data: form.address3 ?? "",
    errorConditions: [errorWhenLengthMoreThan({ length: 100 })],
  });

  contextAddField(formContext, "postcode", {
    label: "Postcode",
    data: form.postcode ?? "",
    errorConditions: errorPostcode.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "city", {
    label: "City",
    data: form.city ?? "",
    errorConditions: [errorWhenLengthMoreThan({ length: 100 })],
  });
  contextAddField(formContext, "state", {
    label: "State",
    data: form.state ?? 0,
    errorConditions: [],
  });

  contextAddField(formContext, "note", {
    label: "Notes",
    data: form.note ?? "",
    disabledConditions: [],
  });

  return (
    <>
      <fieldset class="form-fieldset">
        <legend class="form-legend">
          Personal Details{" "}
          {form?.entityId > 0 && <span>(ID: {form?.entityId})</span>}
        </legend>

        <div class="form-row">
          <input type="hidden" name="entityId" value={form.entityId} />
          <input
            type="hidden"
            name="entityType"
            value={EntityType.INDIVIDUAL}
          />
          <InputText fieldName={"entityName"} formContext={formContext} />
        </div>

        <div class="form-row">
          <input type="hidden" name="entityIcType" value={IdType.IC_NO} />
          <InputText fieldName={"entityIc"} formContext={formContext} />
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
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="form-legend">Address</legend>
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
            options={(states || [])?.map((item: any) => {
              return { labelName: item.long, value: item.num };
            })}
            fieldName={"state"}
            formContext={formContext}
          />
        </div>
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="form-legend">Additional</legend>
        <div class="form-row">
          <Textarea fieldName="note" formContext={formContext}></Textarea>
        </div>
      </fieldset>
    </>
  );
}

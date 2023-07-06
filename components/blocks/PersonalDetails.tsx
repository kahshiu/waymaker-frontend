import { EntityType, IdType } from "../form/Enums.ts";
import { contextAddField } from "../form/FormContext.ts";
import InputText from "../form/InputText.tsx";
import Select from "../form/Select.tsx";
import Textarea from "../form/Textarea.tsx";
import { errorWhenLengthLessThan } from "../form/fn/errorsBasic.ts";
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
  const { formContext, fromSource } = props;

  contextAddField(formContext, "entityName", {
    label: "Name",
    description: "Name of individual",
    data: fromSource.entityName ?? "",
    errorConditions: errorName,
  });
  contextAddField(formContext, "idNo", {
    label: "IC No",
    description: "Malaysian IC No",
    data: fromSource.entityName ?? "",
    fnMasking: MYIdentiyCardMasking,
    errorConditions: errorIC.map(withPrecondition(isMandatory)),
  });

  contextAddField(formContext, "mobileNo", {
    label: "Mobile No",
    data: fromSource.mobileNo ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorPhoneNo.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "officeNo", {
    label: "Office No",
    data: fromSource.officeNo ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: errorPhoneNo.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "email", {
    label: "Email",
    data: fromSource.email ?? "",
    fnMasking: MYPhoneMasking,
    errorConditions: [],
  });

  contextAddField(formContext, "address1", {
    label: "Address1",
    data: fromSource.address1 ?? "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "address2", {
    label: "Address2",
    data: fromSource.address2 ?? "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "address3", {
    label: "Address3",
    data: fromSource.address3 ?? "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });

  contextAddField(formContext, "postcode", {
    label: "Postcode",
    data: fromSource.postcode ?? "",
    errorConditions: errorPostcode.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "city", {
    label: "City",
    data: fromSource.city ?? "",
    errorConditions: [errorWhenLengthLessThan({ length: 100 })],
  });
  contextAddField(formContext, "state", {
    label: "State",
    data: fromSource.state ?? 0,
    errorConditions: [],
  });

  contextAddField(formContext, "note", {
    label: "Notes",
    data: "",
    disabledConditions: [],
  });

  return (
    <fieldset class="form-fieldset">
      <legend class="form-legend">Personal Details</legend>

      <div class="form-row">
        <input type="hidden" name="entityType" value={EntityType.INDIVIDUAL} />
        <InputText fieldName={"entityName"} formContext={formContext} />
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

      <div class="form-row">
        <Textarea fieldName="note" formContext={formContext}></Textarea>
      </div>
    </fieldset>
  );
}

import { EntityType, IdType } from "#components/form/Enums.ts";
import {
  contextAddField,
  contextGetField,
} from "#components/form/FormContext.ts";
import InputText from "#components/form/InputText.tsx";
import Select from "#components/form/Select.tsx";
import Textarea from "#components/form/Textarea.tsx";
import { errorWhenLengthMoreThan } from "#components/form/fn/errorsBasic.ts";
import {
  errorIC,
  errorName,
  errorPhoneNo,
  errorPostcode,
} from "#components/form/fn/errorsSpecial.ts";
import {
  MYIdentiyCardMasking,
  MYPhoneMasking,
} from "#components/form/fn/maskings.ts";
import {
  withPrecondition,
  isMandatory,
} from "#components/form/fn/validators.ts";
import { IBlockForm } from "#components/blocks/interfaces/IBlockForm.ts";
import InputHidden from "#components/form/InputHidden.tsx";
import { ConsoleTags } from "../../../util/globalEnums.ts";
import { consoleDebug } from "../../../util/Console.ts";

export default function PersonalDetails(props: IBlockForm<any>) {
  const { formContext, payload } = props;
  const { entityData, statesData } = payload;
  const form = entityData.payload;
  const states = statesData.payload;
  consoleDebug("tracing PersonalDetails, form: ", { form, entityData }, [
    ConsoleTags.PERSONAL,
  ]);
  consoleDebug("tracing PersonalDetails, states: ", { form, statesData }, [
    ConsoleTags.PERSONAL,
  ]);

  contextAddField(formContext, "entityId", {
    label: "Id",
    description: "Personal ID",
    data: form.entityId ?? "",
  });

  contextAddField(formContext, "entityType", {
    label: "Entity Type",
    description: "Entity Type",
    data: form.entityType ?? EntityType.INDIVIDUAL,
  });

  contextAddField(formContext, "entityName", {
    label: "Name",
    description: "Name of individual",
    data: form.entityName ?? "",
    errorConditions: errorName,
  });
  contextAddField(formContext, "entityIcType", {
    label: "IC No Type",
    description: "Malaysian IC No",
    data: IdType.IC_NO,
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

  contextAddField(formContext, "addressPostcode", {
    label: "Postcode",
    data: form.addressPostcode ?? "",
    errorConditions: errorPostcode.map(withPrecondition(isMandatory)),
  });
  contextAddField(formContext, "addressCity", {
    label: "City",
    data: form.addressCity ?? "",
    errorConditions: [errorWhenLengthMoreThan({ length: 100 })],
  });
  contextAddField(formContext, "addressState", {
    label: "State",
    data: form.addressState ?? 0,
    errorConditions: [],
  });

  contextAddField(formContext, "note", {
    label: "Notes",
    data: form.note ?? "",
    disabledConditions: [],
  });

  consoleDebug(
    "tracing PersonalDetails, formContext: ",
    contextGetField(formContext, "entityType").data.value,
    [ConsoleTags.PERSONAL]
  );

  return (
    <>
      <fieldset class="form-fieldset">
        <legend class="form-legend">
          Personal Details{" "}
          {form?.entityId > 0 && <span>(ID: {form?.entityId})</span>}
        </legend>

        <div class="form-row">
          <InputHidden fieldName={"entityId"} formContext={formContext} />
          <InputHidden fieldName={"entityType"} formContext={formContext} />
          <InputText fieldName={"entityName"} formContext={formContext} />
        </div>

        <div class="form-row">
          <InputHidden fieldName={"entityIcType"} formContext={formContext} />
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
          <InputText fieldName={"addressPostcode"} formContext={formContext} />
        </div>

        <div class="form-row">
          <InputText fieldName={"addressCity"} formContext={formContext} />
        </div>

        <div class="form-row">
          <Select
            options={(states || [])?.map((item: any) => {
              return { labelName: item.long, value: item.num };
            })}
            fieldName={"addressState"}
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

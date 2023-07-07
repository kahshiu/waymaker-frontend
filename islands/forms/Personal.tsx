import PersonalDetails from "../../components/blocks/PersonalDetails.tsx";
import { contextNew } from "../../components/form/FormContext.ts";

interface IPagePersonal {
  payload: any;
}

export default function PagePersonal(props: IPagePersonal) {
  const formContext = contextNew();

  return (
    <form class="form" method="POST" encType="multipart/form-data">
      <PersonalDetails
        formContext={formContext}
        payload={props.payload ?? {}}
      />

      <div class="mx-3 my-1">
        <div class="content-right">
          <input type="submit" class="button-submit" value="submit" />
        </div>
      </div>
    </form>
  );
}

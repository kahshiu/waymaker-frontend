import PersonalDetails from "../../components/blocks/PersonalDetails.tsx";
import { contextNew } from "../../components/form/FormContext.ts";

export default function PagePersonal() {
  const formContext = contextNew();
  return (
    <form class="form">
      <PersonalDetails formContext={formContext} fromSource={{}} />

      <div class="mx-3 my-1">
        <div class="content-right">
          <input type="submit" class="button-submit" value="submit" />
        </div>
      </div>
    </form>
  );
}

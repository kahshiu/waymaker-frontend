import { backendUrl } from "../../util/globals.ts";

const host = "https://accounts.google.com/o/oauth2/auth";
const scope = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
const googleClientId =
  "798053362697-rc5atda1dpjbvu1s9rt9oepterlu80tn.apps.googleusercontent.com";
const googleClientSecret = "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";
const googleRedirectUrl = "http://localhost:8020/api/google/register";

const googleAuthUrl = () => {
  const options = {
    client_id: googleClientId,
    redirect_uri: googleRedirectUrl,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: scope.join(" "),
  };
  const qs = new URLSearchParams(options);
  const result = `${host}?${qs.toString()}`;
  return result;
};

interface ISetupGoogle {
  result: string | null;
  additional: any;
}

export default function SetupGoogle(props: ISetupGoogle) {
  const { result, additional } = props;
  return (
    <>
      <article class="w-8/12">
        <ol className="list-bulk" style="list-style-type: decimal">
          <li>
            <p>Google account used to automate tasks, ie. sending email.</p>
            <div>
              <a class="button-small" href={googleAuthUrl()}>
                Setup OAuth 2.0
              </a>

              {result === "setup_success" && (
                <span class="button-small ml-4 bg-green-300 text-black">
                  **Google authentication successful**
                </span>
              )}
              {result === "setup_failed" && (
                <span class="button-small ml-4 bg-red-300 text-black">
                  **Google authentication failed**
                </span>
              )}
            </div>
          </li>
          <li>
            <p>Verify that OAuth token stored at backend is still valid</p>
            <form method="GET">
              <input type="hidden" name="action" value="verify" />
              <input class="button-small" type="submit" value="Verify" />
              {result === "verify_success" && (
                <>
                  <span class="button-small ml-4 bg-green-300 text-black">
                    **Google token verification successful**
                  </span>
                  <pre>{JSON.stringify(additional, undefined, 2)}</pre>
                </>
              )}
              {result === "verify_failed" && (
                <span class="button-small ml-4 bg-red-300 text-black">
                  **Google token verification failed**
                </span>
              )}
            </form>
          </li>
          <li>
            <p>Test OAuth token by retrieving account details from google</p>
            <form method="GET">
              <input type="hidden" name="action" value="userDetails" />
              <input
                class="button-small"
                type="submit"
                value="Get user detail"
              />
              {result === "details_success" && (
                <>
                  <span class="button-small ml-4 bg-green-300 text-black">
                    **User details retrieved successful**
                  </span>
                  <pre>{JSON.stringify(additional, undefined, 2)}</pre>
                </>
              )}
              {result === "details_failed" && (
                <span class="button-small ml-4 bg-red-300 text-black">
                  **User details retrieved failed**
                </span>
              )}
            </form>
          </li>
          <li>
            <p>Test OAuth token by testing email sending</p>
            <form method="GET">
              <input type="hidden" name="action" value="testMail" />
              <input
                class="button-small"
                type="submit"
                value="Test email sending"
              />
              {result === "test_mail_success" && (
                <>
                  <span class="button-small ml-4 bg-green-300 text-black">
                    **Email tested successful**
                  </span>
                  <pre>{JSON.stringify(additional, undefined, 2)}</pre>
                </>
              )}
              {result === "test_mail_failed" && (
                <span class="button-small ml-4 bg-red-300 text-black">
                  **Email tested failed**
                </span>
              )}
            </form>
          </li>
        </ol>
      </article>
      <article class="w-4/12">
        <div class="sticky top-24 w-full px-4 py-2"></div>
      </article>
    </>
  );
}

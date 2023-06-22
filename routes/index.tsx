import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<any | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    // const resp = await fetch(`http://backend:8000/individual/1`);

    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user = await resp.json();
    return ctx.render(user);
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const entityName = form.get("name")?.toString();

    const resp = await fetch(`http://backend:8000/individual/1`, {
      method: "PATCH",
      body: JSON.stringify({ entityName }),
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("tracing entityName: ", resp);
    // Add email to list.

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function Home(incoming: PageProps) {
  const count = useSignal(3);
  // const {status, payload} = incoming.data;
  // console.log("tracing data: ", payload)
  return (
    <>
      <div class="fixed top-0 flex flex-col w-full h-24 z-50 px-10 pb-0 bg-sky-400">
        <h1 class="text-3xl float-left pt-4">
          Waymaker - <span class="text-xl font-variant-caps">Customer Management System</span>
        </h1>
        <div class="mt-auto">
          <div class="flex flex-row">
            <nav class="grow mt-auto">
              <ul class="flex flex-row items-end cursor-pointer">
                <li class="px-4 py-0.5 hover:border-b-2 border-sky-600 bg-sky-100 hover:bg-sky-200 hover:font-semibold">
                  Home
                </li>
                <li class="px-4 py-0.5 hover:border-b-2 border-sky-600 bg-sky-100 hover:bg-sky-200 hover:font-semibold">
                  Profile
                </li>
                <li class="px-4 py-0.5 hover:border-b-2 border-sky-600 bg-sky-100 hover:bg-sky-200 hover:font-semibold">
                  Reports
                </li>
              </ul>
            </nav>
            <div class="grow mb-1 text-sm text-black text-right">
              <form class="inline-block">
                <div class="inline-block p-0.5">
                  <select
                    name=""
                    id=""
                    class="p-0.5 border-solid border-2 border-gray-300 rounded-md"
                  >
                    <option value="">asdfasdf</option>
                    <option value="">asdfasdf</option>
                    <option value="">asdfasdf</option>
                    <option value="">asdfasdf</option>
                  </select>
                </div>
                <div class="inline-block p-0.5">
                  <input
                    type="text"
                    class="p-0.5 border-solid border-2 border-gray-300 focus:border-sky-500 rounded-md"
                    value="test"
                  />
                </div>
                <div class="inline-block p-0.5">
                  <input
                    type="submit"
                    class="mt-2 px-3 py-0.5 border-2 rounded-md text-white bg-sky-700 hover:text-slate-500 hover:bg-sky-300 hover:transition-all"
                    value="search"
                  />
                </div>
              </form>
              <form class="inline-block pl-2">
                <input
                  type="submit"
                  class="mt-2 text-base text-white hover:text-black hover:underline hover:transition-all"
                  value="logout"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-32 mx-8">
        <div class="">
          <nav class="float-left sticky top-24 w-52 pt-4">
            <ul class="cursor-pointer">
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                hello
              </li>
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                asdf
              </li>
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                asdf
              </li>
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                asdf
              </li>
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                asdf
              </li>
              <li class="hover:border-b-2 border-sky-600 bg-sky-200 hover:bg-sky-300 px-4 py-2 hover:font-semibold">
                asdf
              </li>
            </ul>
          </nav>

          <article class="flex flex-col mt-28">
            <div class="ml-8">
              breadcrumb
            </div>
            <div class="flex flex-row mx-4 px-4 py-2">
              <article class="w-8/12">
                <form className="text-black">
                  <fieldset class="mb-5 px-3 py-2 border-2 border-gray-200 rounded-lg">
                    <legend class="px-3 py-2 pb-2 rounded-lg bg-sky-700 text-white">
                      something Details
                    </legend>
                  </fieldset>

                  <fieldset class="px-3 py-2 border-2 border-gray-200 rounded-lg">
                    <legend class="px-3 py-2 pb-2 rounded-lg bg-sky-700 text-white">
                      Personal Details
                    </legend>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        Person name:
                      </label>
                      <div class="inline-block w-72">
                        <input
                          type="text"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 focus:border-sky-500 rounded-lg"
                          value="test"
                        />
                        <div class="top-0 w-72">This is an error</div>
                      </div>
                    </div>
                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> email:</label>
                      <div class="inline-block w-72">
                        <input
                          type="email"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        password:
                      </label>
                      <div class="inline-block w-72">
                        <input
                          type="password"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        {" "}
                        number:
                      </label>
                      <div class="inline-block w-72">
                        <input
                          type="number"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> range:</label>
                      <div class="inline-block w-72">
                        <input
                          type="range"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> url:</label>
                      <div class="inline-block w-72">
                        <input
                          type="url"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> tel:</label>
                      <div class="inline-block w-72">
                        <input
                          type="tel"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> week:</label>
                      <div class="inline-block w-72">
                        <input
                          type="week"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> month:</label>
                      <div class="inline-block w-72">
                        <input
                          type="month"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> date:</label>
                      <div class="inline-block w-72">
                        <input
                          type="date"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> time:</label>
                      <div class="inline-block w-72">
                        <input
                          type="time"
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> file:</label>
                      <div class="inline-block w-72">
                        <input
                          type="file"
                          class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg"
                          value="test"
                        />
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top"> Days: </label>
                      <div class="inline-block w-72">
                        <select
                          name=""
                          id=""
                          class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg"
                        >
                          <option value="">asdfasdf</option>
                          <option value="">asdfasdf</option>
                          <option value="">asdfasdf</option>
                          <option value="">asdfasdf</option>
                        </select>
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        {" "}
                        browsers:{" "}
                      </label>
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

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        {" "}
                        Favourite Fruits:{" "}
                      </label>
                      <div class="inline-block">
                        <div class="px-3 py-1 w-72 h-8">
                          <input type="radio" class="scale-125" value="test" />
                          <label class="ml-3"> Lemon</label>
                        </div>
                        <div class="px-3 py-1 w-72 h-8">
                          <input type="radio" class="scale-125" value="test" />
                          <label class="ml-3"> Lemon</label>
                        </div>
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        {" "}
                        Comments{" "}
                      </label>
                      <div class="inline-block w-72">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg"
                        ></textarea>
                      </div>
                    </div>

                    <div class="mx-3 my-1">
                      <label class="inline-block w-52 align-top">
                        {" "}
                        Favourite Fruits:{" "}
                      </label>
                      <div class="inline-block">
                        <div class="px-3 py-1 w-72 h-8">
                          <input
                            type="checkbox"
                            class="scale-125"
                            value="test"
                          />
                          <label class="ml-3"> Lemon</label>
                        </div>
                        <div class="px-3 py-1 w-72 h-8">
                          <input
                            type="checkbox"
                            class="scale-125"
                            value="test"
                          />
                          <label class="ml-3"> Lemon</label>
                        </div>
                      </div>
                    </div>
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
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur?
                </div>
              </article>
            </div>
          </article>
        </div>
      </div>

      <footer class="sticky bottom-0 bg-sky-200">
        <div class="flex flex-row justify-items-center mx-8 p-1 text-sm text-slate-500">
          <div class="grow">version 1</div>
          <div class="grow text-right">
            Copyright @ Waymaker | All Rights Reserved
          </div>
        </div>
      </footer>
      {/*
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
*/}
    </>
  );
}

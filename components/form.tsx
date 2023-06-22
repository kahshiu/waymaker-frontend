import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Form(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
        <form className="text-black">

          <fieldset class="px-3 py-2 border-2 border-gray-200 rounded-lg">
            <legend class="px-3 py-2 pb-2 rounded-lg bg-sky-700 text-white">Personal Details</legend>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> Person name:</label>
              <div class="inline-block w-72">
                <input type="text" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 focus:border-sky-500 rounded-lg" value="test"/>
              </div>
            </div>
            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> email:</label>
              <div class="inline-block w-72">
                <input type="email" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> password:</label>
              <div class="inline-block w-72">
                <input type="password" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> number:</label>
              <div class="inline-block w-72">
                <input type="number" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> range:</label>
              <div class="inline-block w-72">
                <input type="range" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> url:</label>
              <div class="inline-block w-72">
                <input type="url" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> tel:</label>
              <div class="inline-block w-72">
                <input type="tel" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> week:</label>
              <div class="inline-block w-72">
                <input type="week" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> month:</label>
              <div class="inline-block w-72">
                <input type="month" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> date:</label>
              <div class="inline-block w-72">
                <input type="date" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> time:</label>
              <div class="inline-block w-72">
                <input type="time" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> file:</label>
              <div class="inline-block w-72">
                <input type="file" class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg" value="test"/>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> Days: </label>
              <div class="inline-block w-72">
                <select name="" id="" class="px-3 py-1 w-full h-8 border-solid border-2 border-gray-300 rounded-lg">
                  <option value="">asdfasdf</option>
                  <option value="">asdfasdf</option>
                  <option value="">asdfasdf</option>
                  <option value="">asdfasdf</option>
                </select>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> browsers: </label>
              <div class="inline-block w-72">
                <input type="text" list="browsers" name="browser" id="browser" 
                  class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg" value="test"/>
                <datalist id="browsers">
                  <option value="edge">edge</option>
                  <option value="firefox">firefox</option>
                  <option value="chrome">chrome</option>
                  <option value="opera">opera</option>
                </datalist>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> Favourite Fruits: </label>
              <div class="inline-block">
                <div class="px-3 py-1 w-72 h-8">
                  <input type="radio" class="scale-125" value="test"/>
                  <label class="ml-3" > Lemon</label>
                </div>
                <div class="px-3 py-1 w-72 h-8">
                  <input type="radio" class="scale-125" value="test"/>
                  <label class="ml-3" > Lemon</label>
                </div>
              </div>
            </div>

            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> Comments </label>
              <div class="inline-block w-72">
                <textarea name="" id="" cols="30" rows="10" class="px-3 py-1 w-full border-solid border-2 border-gray-300 rounded-lg"></textarea>
              </div>
            </div>
            
            <div class="mx-3 my-1">
              <label class="inline-block w-52 align-top"> Favourite Fruits: </label>
              <div class="inline-block">
                <div class="px-3 py-1 w-72 h-8">
                  <input type="checkbox" class="scale-125" value="test"/>
                  <label class="ml-3"> Lemon</label>
                </div>
                <div class="px-3 py-1 w-72 h-8">
                  <input type="checkbox" class="scale-125" value="test"/>
                  <label class="ml-3" > Lemon</label>
                </div>
              </div>
            </div>

          </fieldset>

          <div class="mx-3 my-1">
            <div class="content-right">
              <input type="submit" class="mt-2 px-3 py-1 border rounded-lg text-white bg-sky-700 hover:text-slate-500 hover:bg-sky-300 hover:transition-all" value="submit"/>
            </div>
          </div>
        </form>
  );
}
import { PageProps } from "$fresh/server.ts";

export default function Test(props: PageProps) {
  return <div>Hello from test{props.params.name}</div>;
}

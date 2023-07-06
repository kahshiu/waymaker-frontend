import { PageProps } from "$fresh/server.ts";

export default function IndividualProfile(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}

import { PageProps } from "$fresh/server.ts";

export default function CompanyProfile(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}

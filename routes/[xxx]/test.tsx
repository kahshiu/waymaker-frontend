import { PageProps } from "$fresh/server.ts";

export default function Test(props: PageProps) {
    console.log(props)
    return <div>Hello from test{props.params.name}</div>;
}
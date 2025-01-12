import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return { message: "this is /about" };
}

export default function About() {
  // loader の結果を取得
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ margin: "2rem" }}>
      <h1>{data.message}</h1>
    </div>
  );
}

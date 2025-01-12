import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useActionData, Outlet } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
    const data = params["*"];
    console.log('data', data);
  return { message: "this is /files" };
}

export default function Nested() {
  // loader の結果を取得
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ margin: "2rem" }}>
      <h1>{data.message}</h1>
      <Outlet />
    </div>
  );
}

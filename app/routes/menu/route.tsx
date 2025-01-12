import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useActionData, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  return { message: "this is /menu parent layout" };
}

export default function Menu() {
  // loader の結果を取得
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ margin: "2rem" }}>
      <h1>{data.message}</h1>
      <Outlet />
    </div>
  );
}

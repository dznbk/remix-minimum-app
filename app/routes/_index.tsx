import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

// GET 相当
export async function loader({ request }: LoaderFunctionArgs) {
  // ここで何かデータを取得して返すイメージ
  // 例：return { message: "Hello Remix!" };
  return { message: "Hello Remix!" };
}

// POST 相当
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  // ここでDBに書き込んだり、APIを呼んだりする

  if (!name) {
    // エラーを返す場合
    return redirect("/error");
  }

  // 例：単純にレスポンス返すだけ
  return { success: true, name };
  // あるいは別の画面にリダイレクトしたい場合：
  // return redirect("/somewhere");
}

export default function FormRoute() {
  // loader の結果を取得
  const data = useLoaderData<typeof loader>();
  // action の結果を取得
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ margin: "2rem" }}>
      <h1>{data.message}</h1>
      <p>このページでは loader で取得したデータの表示と、action を使ったフォーム送信ができます。</p>

      <Form method="post">
        <label>
          Name: <input type="text" name="name" />
        </label>
        <button type="submit">送信</button>
      </Form>

      {actionData?.success ? (
        <p>POST 送信成功！こんにちは、{actionData.name} さん！</p>
      ) : null}
    </div>
  );
}

import { Form, Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { createUserSession, getUserId, signIn } from "~/utils/session.server";
import { useEffect } from "react";
import toast from "~/utils/toast.client";
import type {
  LoaderFunction,
  ActionFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import type { SignUpError } from "~/utils/schema";

export const meta: V2_MetaFunction = () => [
  { title: "Eliphile | Sign In" },
  { name: "description", content: "Sign in into Eliphile" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) redirect("/dashboard");

  return null;
};

type ActionData = {
  errors?: SignUpError;
};

export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData());

  if (
    typeof formPayload.username != "string" ||
    typeof formPayload.password != "string"
  ) {
    return json({
      errors: {
        fieldErrors: { username: [], password: [] },
        formErrors: ["Something went wrong"],
      },
    });
  }

  if (!formPayload.username && !formPayload.password) {
    return json({
      errors: {
        fieldErrors: {
          username: ["Username is required"],
          password: ["Password is required"],
        },
        formErrors: [],
      },
    });
  }

  if (!formPayload.username) {
    return json({
      errors: {
        fieldErrors: { username: ["Username is required"], password: [] },
        formErrors: [],
      },
    });
  }

  if (!formPayload.password) {
    return json({
      errors: {
        fieldErrors: { username: [], password: ["Password is required"] },
        formErrors: [],
      },
    });
  }
  const { username, password } = formPayload;
  const user = await signIn(username, password);

  if (!user) {
    return json(
      {
        errors: {
          fieldErrors: { username: [], password: [] },
          formErrors: ["Invalid credentials"],
        },
      },
      { status: 400 },
    );
  }

  return createUserSession(user.id, "/dashboard");
};

export default function SignIn() {
  const data = useActionData<ActionData | undefined>();

  useEffect(() => {
    if (data?.errors) {
      if (data.errors.formErrors.length > 0) toast.error(data.errors.formErrors[0]);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <Form
        method="post"
        className="flex flex-col gap-3 items-center justify-center"
      >
        <div className="flex flex-col gap-2">
          <input
            name="username"
            type="text"
            placeholder="username"
            className="text-field w-56"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            name="password"
            type="password"
            placeholder="password"
            className="text-field w-56"
          />
        </div>
        <Link className="text-sm hover:underline" to="/auth/signup">
          I don't have an account yet.
        </Link>
        <button type="submit" className="btn">
          Sign In
        </button>
      </Form>
    </>
  );
}

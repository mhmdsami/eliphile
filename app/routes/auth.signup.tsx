import { Form, Link, useActionData } from "@remix-run/react";
import { createUserSession, getUserId, signUp } from "~/utils/session.server";
import { json, redirect } from "@remix-run/node";
import { signUpFieldsSchema } from "~/utils/schema";
import type {
  LoaderFunction,
  ActionFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import type { SignUpError } from "~/utils/schema";
import { useEffect } from "react";
import toast from "~/utils/toast.client";

export const meta: V2_MetaFunction = () => [
  { title: "Eliphile | Sign Up" },
  { name: "description", content: "Sign up for Eliphile" },
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

  const res = signUpFieldsSchema.safeParse(formPayload);
  if (!res.success) {
    return json({ errors: res.error.flatten() }, { status: 400 });
  }

  const { username, password } = res.data;

  const user = await signUp(username, password);
  if (!user) {
    return json(
      {
        errors: {
          fieldErrors: { username: [], password: [] },
          formErrors: ["Username already taken"],
        },
      },
      { status: 400 },
    );
  }

  return createUserSession(user.id, "/dashboard");
};

export default function SignUp() {
  const data = useActionData<ActionData | undefined>();

  useEffect(() => {
    if (data?.errors) {
      if (data.errors.formErrors.length > 0) {
        toast.error(data.errors.formErrors[0]);
        return;
      }
      if (data.errors.fieldErrors.username) {
        toast.error(data.errors.fieldErrors.username[0]);
        return;
      }
      if (data.errors.fieldErrors.password) {
        toast.error(data.errors.fieldErrors.password[0]);
        return;
      }
    }
  }, [data]);

  return (
    <>
      <h1 className="text-3xl font-bold">Get Started!</h1>
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
        <Link className="text-sm hover:underline" to="/auth/signin">
          I have an account already!
        </Link>
        <button type="submit" className="btn">
          Sign Up
        </button>
      </Form>
    </>
  );
}

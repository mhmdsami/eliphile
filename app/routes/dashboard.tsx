import DisplayImages from "~/components/DisplayImages";
import { requireUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const images = await db.image.findMany({
    where: { userId },
  });

  return json({ images });
};

export default function Dashboard() {
  const { images } = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-around min-h-[85vh]">
      <Outlet />
      {images.length > 0 ? (
        <DisplayImages images={images} />
      ) : (
        <div className="flex items-center">
          You haven't uploaded any images yet,&nbsp;
          <Link to="/dashboard/upload" className="text-primary">upload</Link>&nbsp;one now!
        </div>
      )}
    </div>
  );
}

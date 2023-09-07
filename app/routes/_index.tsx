import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import DisplayImage from "~/components/DisplayImage";
import type { Image } from "~/types";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Eliphile | Home" },
    { name: "description", content: "Upload your photos!" },
  ];
};

type LoaderData = {
  images: Image[];
};

export const loader: LoaderFunction = async () => {
  const imageCount = await db.image.count();
  const skip = Math.max(0, Math.floor(Math.random() * imageCount) - 6);

  const images = await db.image.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: 6,
  });

  for (const { id } of images) {
    await db.image.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  return json({ images });
};

export default function Index() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <div className="my-8 lg:mx-20 grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
      {images.map((image) => (
        <div key={image.id}>
          <DisplayImage key={image.id} {...image} />
        </div>
      ))}
    </div>
  );
}

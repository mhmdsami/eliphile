import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Eliphile | Home" },
    { name: "description", content: "Upload your photos!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-[85vh] items-center justify-center text-5xl font-bold text-primary">
      Elihphile
    </div>
  );
}

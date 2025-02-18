import Upload from "@/components/Upload";

export default function Home() {
  return (
    <main className=" m-10 ">
      <div className="flex flex-col items-center p-10">
        <h1 className="text-2xl font-bold">GPX HR Analyzer</h1>

        <p className="mt-4 text-gray-600">
          Upload and compare heart rate data from GPX files.
        </p>
      </div>
      <Upload />
    </main>
  );
}

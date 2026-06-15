import Head from "next/head";
import Image from "next/image";

export default function DesignReference() {
  return (
    <>
      <Head>
        <title>Design Reference - CutMetall</title>
      </Head>
      <div className="min-h-screen bg-surface p-8">
        <h1 className="text-2xl font-display font-bold mb-4">Stitch Design Referenz</h1>
        <div className="border border-outline-variant rounded-lg p-4">
          <Image
            src="/reference-design.png"
            alt="Stitch CutMetall Design"
            width={1400}
            height={4600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}
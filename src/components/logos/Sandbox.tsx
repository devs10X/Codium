import Image from "next/image";
import type { SVGProps } from "react";

export default function MagicUI(props: SVGProps<SVGSVGElement>) {
  return (
    <Image src="/sandbox.png" width={30} height={30} alt="sandbox" />
  );
}

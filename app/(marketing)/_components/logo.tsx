"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        alt="logo"
        src={"/logo.svg"}
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        alt="logo"
        src={"/logo-dark.svg"}
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};

export default Logo;

import { Coffee } from "lucide-react";
import Link from "next/link";

import { getAllCategories } from "@/lib/api";
import { Button } from "../ui/button";
import { Heading } from "../ui/typography";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-800 text-gray-100 text-center text-sm">
      <div className="container max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center items-center text-center py-10 space-y-10">
          <Button className="hover:-skew-x-6 flex gap-2 items-center animate-all">
            <span>Pay me a coffee!</span>
            <Coffee />
          </Button>
          <div>
            <Heading className="uppercase" size="h3" asChild>
              <h3>Categories</h3>
            </Heading>
            <ul className="space-y-1">
              {getAllCategories().map((category) => (
                <li key={category} className="capitalize">
                  <Link href={`/categories/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex space-x-3 justify-center">
            <li className="italic">see you on</li>
            <li>
              <Link href="https://github.com/ronniegchagas" target="_blank">
                Github
              </Link>
            </li>
            <li>&#xb7;</li>
            <li>
              <Link
                href="https://linkedin.com/in/ronniegchagas"
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
            <li>&#xb7;</li>
            <li>
              <Link href="https://x.com/ronniegchagas" target="_blank">
                X
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

import { Coffee } from "lucide-react";
import Link from "next/link";

import { getAllCategories } from "@/lib/api";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-slate-800 text-gray-100 text-center text-sm">
      <div className="container max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center items-center text-center py-10 space-y-10">
          <button className="bg-primary hover:bg-primary/90 hover:-skew-x-6 transition-all duration-300 ease-in-out text-primary-foreground rounded-lg py-3 px-5 flex gap-2 items-center">
            <h3>Pay me a coffee!</h3>
            <Coffee />
          </button>
          <div>
            <h3 className="text-lg font-semibold uppercase">Categories</h3>
            <ul>
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

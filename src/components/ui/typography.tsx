import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type PropsWithText = {
  children: ReactNode;
};

type PropsWithList = {
  list: {
    id: string;
    text: string;
  }[];
};

type HtmlHeading = HTMLHeadingElement;

export interface HeadingProps
  extends ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const headingVariants = cva("scroll-m-20 font-semibold tracking-tight", {
  variants: {
    variant: {
      default: "",
      border: "pb-2 border-b",
    },
    size: {
      default: "text-normal",
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "h2",
  },
});

export const Heading = forwardRef<HtmlHeading, HeadingProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1";
    return (
      <Comp
        className={cn(headingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export function P({ children, ...props }: PropsWithText & ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    >
      {children}
    </p>
  );
}

export function Blockquote({
  children,
  ...props
}: PropsWithText & ComponentProps<"blockquote">) {
  return (
    <blockquote
      {...props}
      className={cn("mt-6 border-l-2 pl-6 italic", props.className)}
    >
      {children}
    </blockquote>
  );
}

export function List({ list, ...props }: PropsWithList & ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", props.className)}
    >
      {list.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export function InlineCode({
  children,
  ...props
}: PropsWithText & ComponentProps<"code">) {
  return (
    <code
      {...props}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        props.className
      )}
    >
      {children}
    </code>
  );
}

export function Lead({
  children,
  ...props
}: PropsWithText & ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-xl text-muted-foreground", props.className)}
    >
      {children}
    </p>
  );
}

export function TextLarge({
  children,
  ...props
}: PropsWithText & ComponentProps<"div">) {
  return (
    <div {...props} className={cn("text-lg font-semibold", props.className)}>
      {children}
    </div>
  );
}

export function TextSmall({
  children,
  ...props
}: PropsWithText & ComponentProps<"small">) {
  return (
    <small
      {...props}
      className={cn("text-sm font-medium leading-none", props.className)}
    >
      {children}
    </small>
  );
}

export function TextMuted({
  children,
  ...props
}: PropsWithText & ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-sm text-muted-foreground", props.className)}
    >
      {children}
    </p>
  );
}

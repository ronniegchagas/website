"use client";

import { Paintbrush } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app";

export function Customize() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Paintbrush />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container mx-auto">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-center">Customize</DrawerTitle>
          <DrawerDescription className="text-center">
            Customize the blog to your liking.
          </DrawerDescription>
        </DrawerHeader>
        <CustomizeForm className="p-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CustomizeForm({ className }: React.ComponentProps<"form">) {
  const appStore = useAppStore((state) => state);

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        value={appStore.state.screenWidth}
        onValueChange={(value: "md" | "lg" | "xl") => {
          if (value) appStore.dispatch.changeScreen(value);
        }}
      >
        <div className="ml-3">Screen size:</div>
        <ToggleGroupItem value="md" aria-label="Toggle Medium">
          Medium
        </ToggleGroupItem>
        <ToggleGroupItem value="lg" aria-label="Toggle Large">
          Large
        </ToggleGroupItem>
        <ToggleGroupItem value="xl" aria-label="Toggle Extra Large">
          Extra Large
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        value={appStore.state.fontSize}
        onValueChange={(value: "sm" | "normal" | "lg") => {
          if (value) appStore.dispatch.changeFont(value);
        }}
      >
        <div className="ml-3">Font size:</div>
        <ToggleGroupItem value="sm" aria-label="Toggle Small">
          Small
        </ToggleGroupItem>
        <ToggleGroupItem value="normal" aria-label="Toggle Normal">
          Normal
        </ToggleGroupItem>
        <ToggleGroupItem value="lg" aria-label="Toggle Large">
          Large
        </ToggleGroupItem>
      </ToggleGroup>
    </form>
  );
}

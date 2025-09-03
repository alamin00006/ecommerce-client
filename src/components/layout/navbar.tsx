// src/components/layout/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  MagnifyingGlassIcon,
  PersonIcon,
  ExitIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "হোম", href: "/" },
  {
    name: "সেবাসমূহ",
    href: "/services",
    dropdown: [
      { name: "ওয়েব ডেভেলপমেন্ট", href: "/services/web-development" },
      { name: "মোবাইল অ্যাপস", href: "/services/mobile-apps" },
      { name: "UI/UX ডিজাইন", href: "/services/ui-ux-design" },
      { name: "ডিজিটাল মার্কেটিং", href: "/services/digital-marketing" },
    ],
  },
  {
    name: "পোর্টফোলিও",
    href: "/portfolio",
    dropdown: [
      { name: "ওয়েবসাইট", href: "/portfolio/websites" },
      { name: "মোবাইল অ্যাপস", href: "/portfolio/mobile-apps" },
      { name: "গ্রাফিক ডিজাইন", href: "/portfolio/graphic-design" },
    ],
  },
  { name: "ব্লগ", href: "/blog" },
  { name: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* লোগো */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            Amful Software
          </span>
        </Link>

        {/* ডেস্কটপ ন্যাভিগেশন */}
        <nav className="hidden md:flex items-center">
          <NavigationMenu.Root className="relative flex">
            <NavigationMenu.List className="flex space-x-1">
              {navItems.map((item) => (
                <NavigationMenu.Item key={item.name} className="relative">
                  {item.dropdown ? (
                    <>
                      <NavigationMenu.Trigger className="group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground transition-colors">
                        {item.name}
                        <ChevronDownIcon
                          className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute left-0 top-full w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                        <div className="grid gap-1">
                          {item.dropdown.map((dropdownItem) => (
                            <NavigationMenu.Link
                              key={dropdownItem.name}
                              asChild
                            >
                              <Link
                                href={dropdownItem.href}
                                className="flex w-full items-center rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              >
                                {dropdownItem.name}
                              </Link>
                            </NavigationMenu.Link>
                          ))}
                        </div>
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground",
                          pathname === item.href &&
                            "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>

            <NavigationMenu.Viewport className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 origin-[--radix-navigation-menu-viewport-transform-origin] absolute left-0 top-full flex h-[var(--radix-navigation-menu-viewport-height)] w-full justify-center" />
          </NavigationMenu.Root>
        </nav>

        {/* ডেস্কটপ একশন বাটন */}
        <div className="hidden md:flex items-center space-x-3">
          {/* সার্চ বাটন */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>

          {/* ব্যবহারকারী মেনু */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>
                    <PersonIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-56 rounded-md border bg-popover p-2 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                align="end"
                sideOffset={5}
              >
                <DropdownMenu.Label className="px-2 py-1.5 text-sm font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-muted" />
                <DropdownMenu.Group>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/profile"
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      প্রোফাইল
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/settings"
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      সেটিংস
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-muted" />
                <DropdownMenu.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-600 focus:text-red-600">
                  <ExitIcon className="mr-2 h-4 w-4" />
                  <span>লগ আউট</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* মোবাইল মেনু */}
        <div className="md:hidden">
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
              <Button variant="ghost" size="icon">
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">মেনু টগল করুন</span>
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-3/4 border-l bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="font-bold text-xl">Amful Software</span>
                  </Link>
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon">
                      <Cross1Icon className="h-5 w-5" />
                      <span className="sr-only">বন্ধ করুন</span>
                    </Button>
                  </Dialog.Close>
                </div>
                <div className="p-4">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.dropdown ? (
                          <div className="space-y-2">
                            <p className="font-medium text-foreground/70 px-3 py-2">
                              {item.name}
                            </p>
                            <div className="pl-4 space-y-2">
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                              pathname === item.href &&
                                "bg-accent text-accent-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-col space-y-3">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          সাইন ইন
                        </Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link
                          href="/get-started"
                          onClick={() => setIsOpen(false)}
                        >
                          শুরু করুন
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* সার্চ ডায়ালগ */}
      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <div className="flex flex-col space-y-4">
              <Dialog.Title className="text-lg font-semibold">
                খুঁজুন
              </Dialog.Title>
              <Input
                placeholder="আপনি কি খুঁজতে চান?"
                autoFocus
                className="w-full"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSearchOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={() => setSearchOpen(false)}>খুঁজুন</Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

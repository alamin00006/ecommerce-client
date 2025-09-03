import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

// ফেক ডেটা জেনারেটর ফাংশন
const generateUsers = (count: number): any[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    avatar: faker.image.avatar(),
    phone: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
    },
    company: {
      name: faker.company.name(),
    },
  }));
};

// ইন-মেমোরি ডেটাবেস (প্রডাকশনে Real Database ব্যবহার করুন)
let users = generateUsers(10);

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newUser = {
    id: users.length + 1,
    ...body,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...userData } = body;

  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  users[index] = { ...users[index], ...userData };
  return NextResponse.json(users[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  users.splice(index, 1);
  return NextResponse.json({ message: "User deleted successfully" });
}

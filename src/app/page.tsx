"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from "@/lib/store/apiSlice";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();

  const handleAddUser = async () => {
    if (!name || !email) return;

    try {
      await addUser({
        name,
        email,
        username: name.toLowerCase().replace(/\s+/g, ""),
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      }).unwrap();

      setName("");
      setEmail("");
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error)
    return <div className="container mx-auto p-4">Error loading users</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        User Management System
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Users List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users?.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddUser}
                  className="w-full"
                  disabled={!name || !email}
                >
                  Add User
                </Button>
                <Button variant="outline" onClick={refetch} className="w-full">
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

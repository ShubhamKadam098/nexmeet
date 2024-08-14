"use client";
import React, { useEffect, useState } from "react";
import { userDetails } from "../../action/userDetails";
import Loading from "../../components/Loading"

interface User {
  id: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
}

function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDetails()
      .then((res: any) => {
        // console.log(res)
        setUser(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="absolute top-0 w-full h-screen bg-black text-white py-[8rem] px-[2rem] flex flex-col justify-start items-center gap-24">
      <h1 className="text-center text-4xl font-bold">Your Profile</h1>
      {loading ? (
        <Loading />
      ) : user ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <img src={user.picture} alt={`${user.given_name} ${user.family_name}`} className="rounded-full" />
          <h1>{user.given_name} {user.family_name}</h1>
          <h2>{user.email}</h2>
        </div>
      ) : (
        <h1>No user details available</h1>
      )}
    </div>
  );
}

export default Page;

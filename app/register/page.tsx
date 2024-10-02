"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"student" | "teacher" | "admin" | "parent">("student");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setError("All fields are necessary");
      return;
    }
  
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
  
    if (res.status === 201) {
      router.push("/login");
    } else {
      // Try-catch block to handle JSON parsing errors
      try {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      } catch (error) {
        setError("Invalid response from the server");
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border rounded focus:ring" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full p-2 border rounded focus:ring" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value as "student" | "teacher" | "admin" | "parent")} className="mt-1 block w-full p-2 border rounded focus:ring">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          <option value="parent">Parent</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
  );
};
export default Register;

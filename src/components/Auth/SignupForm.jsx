import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function SignupForm() {
  const { signup, loading } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUserSignup = async (e) => {
    e.preventDefault();
    setError(null); // clear previous errors
    try {
      await signup({ email, password, options: { data: { username } } });
      alert("Signed up! Check your email for confirmation.");
      // optionally clear form
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log("Signup error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 p-10 text-white border rounded-lg">
      <form onSubmit={handleUserSignup}>
        <FieldSet className="py-10">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <h2 className="text-xl mb-4">Sign up for free now!</h2>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Max Leiter"
                className="outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FieldDescription>
                Choose a unique username for your account.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <Button type="submit" variant="outline" className="mt-4 text-black">
              {loading ? "Signing up..." : "Submit"}
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}

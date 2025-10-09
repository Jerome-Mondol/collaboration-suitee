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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export function LoginForm() {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleUserSignup = async (e) => {
    e.preventDefault();
    setError(null); // clear previous errors
    try {
      await login({ email, password });
      alert("Logged in");
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
        <h1 className="text-3xl font-bold mb-2">Welcome! back user</h1>
        <h2 className="text-lg mb-1">Login!</h2>
        <FieldSet className="py-10">
          <h3>Dont have an Account? <Link to={'/signup'} className="text-blue-500" >Signup</Link></h3>

          <FieldGroup>
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


           
              <Button
  type="submit"
  variant="outline"
  className="mt-4 text-black flex items-center justify-center gap-2"
  disabled={loading}
>
  {loading && <Spinner size="sm" />}
  {loading ? "Loging in..." : "Login"}
</Button>


          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}

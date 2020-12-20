import { useForm } from 'react-hook-form';
import { useAuth } from "../hooks/useAuth"
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from "next/link"
import Button from "./Button"
import Alert from "./Alert"


const LoginData = {
    email: "",
    password: "",
}
const LoginForm = () => {
    const { register, errors, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(null)
    const auth = useAuth()
    const router = useRouter()
    const onSubmit = (data = LoginData) => {
        setIsLoading(true)
        setError(null)
        return auth.signIn(data).then((response) => {
            setIsLoading(false)
            response.error ?
                setError(response.error) :
                router.push("/dashboard")
        })
    };
    const closeAlert = () => {
        setError(null)
        setIsLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error?.message && <Alert message={error.message} closeAlert={closeAlert} />

            }
            <div className="form-group">
                <label
                    htmlFor="email"
                >
                    Email address
    </label>
                <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    ref={register({
                        required: 'Please enter an email',
                        pattern: {
                            message: 'Not a valid email',
                        },
                    })}
                />
                {errors.email && (
                    <div className="mt-2 text-danger">
                        {errors.email.message}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label
                    htmlFor="password"
                >
                    Password
    </label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    ref={register({
                        required: 'Please enter a password',
                        minLength: {
                            value: 6,
                            message: 'Should have at least 6 characters',
                        },
                    })}
                />
                {errors.password && (
                    <div className="mt-2 text-danger">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <div className="mt-4 flex items-end">
                <div>
                    <Link href="/reset-password">
                        <a
                            href="#"

                        >
                            Forgot your password?
   </a>
                    </Link>
                </div>
            </div>

            <div className="mt-4">

                <Button title="Login" type="submit" isLoading={isLoading} />
            </div>
        </form>
    );
};
export default LoginForm;
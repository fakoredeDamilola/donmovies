import { useForm } from 'react-hook-form';
import { useAuth } from "../hooks/useAuth"
import { useRouter } from 'next/router'
import Button from "./Button"
import Alert from "./Alert"
import { useState } from 'react'
const SignUpData = {
    name: "",
    email: "",
    password: "",
}
const SignUpForm = () => {
    const { register, errors, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(null)
    const auth = useAuth()
    const router = useRouter()
    const signUp = ({ name, email, password }) => {
        setIsLoading(true)
        setError(null)
        return auth.signUp({ name, email, password }).then((response) => {
            setIsLoading(false)
            response.error ?
                setError(response.error) :
                router.push("/dashboard")
        })

    };

    const onSubmit = (data = SignUpData) => {
        return signUp(data).then((user) => {
            console.log(user);
        });
    };
    const closeAlert = () => {
        setError(null)
        setIsLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error?.message && <Alert message={error.message} />

            }
            <div className="form-group">
                <label
                    htmlFor="inputName"
                >
                    Name
      </label>
                <input
                    id="inputName"
                    className="form-control"
                    type="text"
                    name="name"
                    ref={register({
                        required: 'Please enter a name',
                    })}
                />
                {errors.name && (
                    <div className="mt-2 text-danger">
                        {errors.name.message}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label
                    htmlFor="inputEmail"
                >
                    Email address
      </label>

                <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    ref={register({
                        required: 'Please enter a email',
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
                    htmlFor="inputPassword"
                >
                    Password
      </label>
                <input
                    id="inputPassword"
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
            <div className="mt-4">

                <Button title="Signup" type="submit" isLoading={isLoading} />
            </div>
        </form>
    );
}

export default SignUpForm;
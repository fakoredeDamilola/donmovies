import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Button from "./Button"
const ResetPasswordForm = () => {
    const { register, errors, handleSubmit } = useForm();
    const auth = useAuth();
    const router = useRouter();
    const onSubmit = (data) => {
        auth.sendPasswordResetEmail(data.email);
        router.push('/login');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="mt-4">

                <Button title="Login" type="submit" />
            </div>
        </form>
    );
};
export default ResetPasswordForm;
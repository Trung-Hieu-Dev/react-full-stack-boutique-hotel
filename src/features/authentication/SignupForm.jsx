import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSignup } from "./useSignup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { reset, register, handleSubmit, getValues, formState } = useForm();

  // errors are used for form validation
  const { errors } = formState;

  const { signup, isLoading } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address!",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errors={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            pattern: {
              value: 8,
              message: "Password must be at least 8 characters long!",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errors={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

import * as Yup from "yup";

export const registerScheme = Yup.object().shape({
    username: Yup.string().required("username is required"),
	email: Yup.string()
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Email tidak valid"
		)
		.required("Email is required"),
});
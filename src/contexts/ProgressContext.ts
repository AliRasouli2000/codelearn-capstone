import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type UserData = {
	username: string;
	email: string;
	password: string;
	htmlQuizScore: string;
	cssQuizScore: string;
	JSQuizScore: string;
	loggedIn: boolean;
};

export type ProgressContextValue = {
	userData: UserData;
	setUserData: Dispatch<SetStateAction<UserData>>;
};

export const defaultUserData: UserData = {
	username: "",
	email: "",
	password: "",
	htmlQuizScore: "",
	cssQuizScore: "",
	JSQuizScore: "",
	loggedIn: false,
};

const ProgressContext = createContext<ProgressContextValue>({
	userData: defaultUserData,
	setUserData: () => {},
});

export default ProgressContext;


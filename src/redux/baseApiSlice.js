import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setAuth } from "./features/auth/authSlice";
import { Mutex } from "async-mutex";

const baseUrl = "http://127.0.0.1:8000/";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	credentials: "include",
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: "/auth/jwt/refresh/",
						method: "POST",
					},
					api,
					extraOptions,
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
	tagTypes: [
		"POSTS",
		"PROFILE",
		"LIKES",
		"BOOKMARKS",
		"EVENTS",
		"PROFILES",
		"JOBS",
		"EDUCATION",
	],
});

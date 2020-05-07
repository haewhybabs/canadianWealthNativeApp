export const SAVE_USER_DETAILS = "SAVE_USER_DETAILS";

export function saveUserDetailsAction({ user_id, fullname, email, role_id, token }) {
    return {
        type: SAVE_USER_DETAILS,
        payload: {
            user_id,
            fullname,
            email,
            role_id,
            token
        }
    }
}
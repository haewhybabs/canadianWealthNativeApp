export const SAVE_USER_DETAILS = "SAVE_USER_DETAILS";

export function saveUserDetailsAction({ token }) {
    return {
        type: SAVE_USER_DETAILS,
        payload: {
            token
        }
    }
}
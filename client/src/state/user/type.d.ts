type User = {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isPaid: boolean;
    isBanned: boolean;
};

type UserState = {
    user: User | null;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
}

namespace UserAPI {
    type SignupForm = {
        username: string;
        email: string;
        password: string;
    };
    type SigninForm = {
        email: string;
        password: string;
    };
    type UpdateUserForm = {
        username: string;
        email: string;
    };
    type UpdatePasswordForm = {
        oldPassword: string;
        newPassword: string;
    }
}

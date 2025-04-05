import { Button } from '@/components/ui/button';
import { routesPaths } from '@/constants/routes';
import { LoginSocialActionTypeEnum, SocialTypeEnum } from '@/enums/social-type.enum';
import { FaXTwitter } from 'react-icons/fa6';
import { baseUrl } from '@/configs/config';
const loginTypes = [
    {
        key: SocialTypeEnum.X,
        name: "X",
        // icon: x,
        type: "social",
    },
]
const LoginButton = () => {
    const searchParams = new URLSearchParams(location.search);

    const redirectToLoginSocial = (provider: SocialTypeEnum) => {
        const appUrl = window.location.origin;
        const ref = searchParams.get("ref");

        const params = new URLSearchParams({
            state: `${appUrl}${routesPaths.AUTH_CALLBACK}`,
            ...(ref ? { ref } : {}),
            action: LoginSocialActionTypeEnum.Login,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        window.location.href = `${baseUrl}auth/login/${provider}?${params.toString()}`;
    };

    const handleSocialLogin = async (provider: SocialTypeEnum) => {
        redirectToLoginSocial(provider)
    };

    return (
        <>
            {loginTypes.map((loginType) => (
                <Button
                    key={loginType.key}
                    variant="destructive"
                    className="flex items-center pointer-events-auto z-40 justify-center bg-black text-white  font-bold w-1/2 rounded-lg shadow-2xl transition-colors"
                    onClick={() => handleSocialLogin(loginType.key)}
                >
                    <FaXTwitter className="text-white text-xl" />
                    <span>Login with X</span>
                </Button>
            ))}
        </>
    )
}

export default LoginButton
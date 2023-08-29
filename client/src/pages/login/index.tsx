import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    Input,
} from "@nextui-org/react";
import { Github } from "@icon-park/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const Login = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        if (token) {
            setAccessToken(token)
        }
    }, [token])

    const handleGithubLogin = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/github`);
            window.location.href = response.data.url;
        } catch (error) {
            console.error('GitHub login error:', error);
        }
    };

    console.log(accessToken)

    return (
        <div className="dark w-screen h-screen flex justify-center items-center">
            <Card isBlurred className="max-w-[400px]">
                <CardHeader className="flex py-5">
                    <Image
                        alt="Vam-Talkie LOGO"
                        height={50}
                        radius="sm"
                        src="vam-talkie.svg"
                    />
                </CardHeader>
                <Divider />
                <CardBody className="space-y-2">
                    <Button
                        className="bg-black"
                        startContent={<Github className="scale-125" />}
                        onClick={handleGithubLogin}
                    >
                        Continue with Github
                    </Button>
                    <Divider />
                    <Input variant="bordered" type="email" label="Email" />
                    <Input variant="bordered" type="password" label="Password" />
                    <Button color="primary">Login</Button>
                </CardBody>
                <Divider />
                <CardFooter>
                    <RouterLink to="/register">
                        New to Vam-Talkie?
                    </RouterLink>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;

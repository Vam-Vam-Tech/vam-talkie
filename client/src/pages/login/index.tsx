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
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';

const Login = () => {

    const handleGithubLogin = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/github');
            window.location.href = response.data.url;
        } catch (error) {
            console.error('GitHub login error:', error);
        }
    };

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

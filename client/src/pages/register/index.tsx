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

const Register = () => {
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
                    >
                        Continue with Github
                    </Button>
                    <Divider />
                    <Input variant="bordered" type="email" label="Email" />
                    <Button color="primary">Register</Button>
                </CardBody>
                <Divider />
                <CardFooter>
                    <RouterLink to="/login">
                        Already have an account?
                    </RouterLink>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;

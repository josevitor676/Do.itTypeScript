import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Input } from "../../components/Form/Input"
import {FaEnvelope, FaLock} from "react-icons/fa"
import * as yup from "yup"
import  {yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { LoginInfo } from "./LoginInfo"
import { LoginForm } from "./LoginForm"

const signInSchema = yup.object().shape({
    email: yup.string().required("Email Obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória")
})

interface SignInData {
    email: string;
    password: string;
}

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const { signIn, user } = useAuth();


    const {
        formState: { errors }, 
        register,
        handleSubmit
    } = useForm<SignInData>({
        resolver: yupResolver(signInSchema)
    })

    const handleSignIn: SubmitHandler<SignInData> = (data: SignInData) => {
        setLoading(true)
        signIn(data)
        .then((_) => setLoading(false))
        .catch((err) => setLoading(false))
    }
 
    return (
        <Flex 
        p={["10px 15px", "10px 15px", "0px", "0px" ]}
        alignItems="center" 
        justifyContent="center"
        h={["auto", "auto", "100vh", "100vh"]}
        bgGradient={[
            "linear(to-b, purple.800 65%, white 35%)",
            "linear(to-b, purple.800 65%, white 35%)",
            "linear(to-r, purple.800 65%, white 35%)",
            "linear(to-r, purple.800 65%, white 35%)"
        ]}
        color="white"
        >
            <Flex 
            w={["100%", "100%", "90%", "65%"]} 
            justifyContent="center" 
            flexDirection={["column", "column" ,"row", "row"]} 
            alignItems="center"
            >
                <LoginInfo/>
                <LoginForm 
                errors={errors} 
                handleSignIn={handleSubmit(handleSignIn)} 
                loading={loading}
                register={register}
                />
            </Flex>
        </Flex>
    )
}
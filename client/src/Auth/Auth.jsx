import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // добавляем navigate

const Auth = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // инициализируем navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "/login" : "/register";
        try {
            const response = await axios.post(`http://localhost:5000${endpoint}`, form);

            console.log(response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // сохраняем токен
                alert(isLogin ? "Login successful!" : "Registration successful!");
                navigate('/game'); // переходим на /game
            } else {
                alert("Authentication failed: no token received.");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h2" gutterBottom
                sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "20px",
                    textAlign: "center",
                    textTransform: "uppercase",
                }}>
                {isLogin ? "Login" : "Register"}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "500px",
                }}
            >
                <TextField
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    sx={{ width: "500px" }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    sx={{ width: "500px" }}
                />
                <Button type="submit" variant="contained" color="primary">
                    {isLogin ? "Login" : "Register"}
                </Button>
                <Button
                    variant="text"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Switch to Register" : "Switch to Login"}
                </Button>
            </Box>
        </Box>
    );
};

export default Auth;

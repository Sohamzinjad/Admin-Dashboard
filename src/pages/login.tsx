import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitle } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";
import yariga from "../assets/yariga.svg";

// ✅ Google Client ID (Vite-safe)
const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  // 🔹 Google Button Component
  const GoogleButton = () => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: (res: CredentialResponse) => {
          if (res.credential) {
            login({
              credential: res.credential,
            });
          }
        },
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "filled_blue",
        size: "medium",
        type: "standard",
      });
    }, []);

    return (
      <Box
        ref={divRef}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    );
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        {/* Logo */}
        <Box display="flex" justifyContent="center">
          <img src={yariga} alt="Yariga Logo" width={120} />
        </Box>

        {/* Title */}
        <ThemedTitle
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />

        {/* Google Sign In Button */}
        <GoogleButton />

        {/* Footer */}
        <Typography align="center" color="text.secondary" fontSize="12px">
          Powered by
          <img
            style={{ padding: "0 5px", verticalAlign: "middle" }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  );
};
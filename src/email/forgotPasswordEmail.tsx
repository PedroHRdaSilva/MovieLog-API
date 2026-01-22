import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface forgotPasswordEmailProps {
  name: string;
  resetPasswordToken: string;
}

export const forgotPasswordEmail = ({
  name,
  resetPasswordToken,
}: forgotPasswordEmailProps) => {
  const url = `http://localhost:3009/reset-password/${resetPasswordToken}`;

  return (
    <Html>
      <Head />
      <Preview>Redefinição de senha</Preview>

      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Text>Olá {name},</Text>

          <Text>
            Recebemos uma solicitação para redefinir sua senha. Para continuar,
            clique no link abaixo:
          </Text>

          <Text>
            <Link href={url}>Redefinir minha senha</Link>
          </Text>

          <Text>Se você não solicitou isso, pode ignorar este email.</Text>

          <Text>
            Atenciosamente,
            <br />
            Equipe do sistema
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default forgotPasswordEmail;

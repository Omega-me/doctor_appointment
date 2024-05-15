'use client';
import { Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor } from '@mantine/core';
import { memo } from 'react';
import s from './login.module.css';

interface LoginProps {}

const Login: React.FC<LoginProps> = props => {
  return (
    <div className={s.wrapper}>
      <Paper className={s.form} radius={0} p={30}>
        <Title order={2} className={s.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>

        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={event => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default memo(Login);

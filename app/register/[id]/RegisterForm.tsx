'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { lookupRegisterInvite } from '@/lib/api/register-invite';

type RegisterFormProps = {
  invitationId: string;
};

type LookupState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'ready'; discordId: string };

type FormValues = {
  accountName: string;
  password: string;
  confirmPassword: string;
};

type FormTouched = {
  accountName: boolean;
  password: boolean;
  confirmPassword: boolean;
};

function createInitialValues(): FormValues {
  return {
    accountName: '',
    password: '',
    confirmPassword: '',
  };
}

function createInitialTouched(): FormTouched {
  return {
    accountName: false,
    password: false,
    confirmPassword: false,
  };
}

const ACCOUNT_NAME_REGEX = /^[A-Za-z0-9_]+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]+$/;

function getAccountNameError(value: string): string {
  if (!value.trim()) {
    return '請輸入帳號名稱。';
  }

  if (!ACCOUNT_NAME_REGEX.test(value)) {
    return '帳號名稱只能使用英文、數字、底線。';
  }

  return '';
}

function getPasswordError(value: string): string {
  if (!value) {
    return '請輸入密碼。';
  }

  if (!PASSWORD_REGEX.test(value)) {
    return '密碼只能使用英文與數字。';
  }

  if (value.length <= 10) {
    return '密碼長度需要大於 10 碼。';
  }

  return '';
}

function getConfirmPasswordError(password: string, confirmPassword: string): string {
  if (!confirmPassword) {
    return '請再次輸入密碼。';
  }

  if (password !== confirmPassword) {
    return '密碼與確認密碼不一致。';
  }

  return '';
}

type ApiTResponse<T> = {
  message: string;
  data: T | null;
};

export default function RegisterForm({ invitationId }: RegisterFormProps) {
  const pathname = usePathname();

  const [lookupState, setLookupState] = React.useState<LookupState>({ status: 'loading' });
  const [values, setValues] = React.useState<FormValues>(createInitialValues);
  const [touched, setTouched] = React.useState<FormTouched>(createInitialTouched);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;

    const runLookup = async () => {
      setLookupState({ status: 'loading' });
      const result = await lookupRegisterInvite(invitationId);

      if (cancelled) {
        return;
      }

      if (!result.found) {
        setLookupState({ status: 'not-found' });
        return;
      }

      setLookupState({ status: 'ready', discordId: result.discordId });
    };

    void runLookup();

    return () => {
      cancelled = true;
    };
  }, [invitationId, pathname]);

  React.useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, [invitationId]);

  const handleChange =
    (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleBlur = (key: keyof FormTouched) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const accountNameError = getAccountNameError(values.accountName);
  const passwordError = getPasswordError(values.password);
  const confirmPasswordError = getConfirmPasswordError(values.password, values.confirmPassword);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setTouched({
      accountName: true,
      password: true,
      confirmPassword: true,
    });

    if (lookupState.status !== 'ready') {
      setErrorMessage('邀請資料尚未完成驗證，請稍後再試。');
      return;
    }

    if (accountNameError) {
      setErrorMessage(accountNameError);
      return;
    }

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (confirmPasswordError) {
      setErrorMessage(confirmPasswordError);
      return;
    }

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          register_id: invitationId,
          user_name: values.accountName.trim(),
          password: values.password,
        }),
      });
      const json = (await res.json()) as ApiTResponse<unknown>;
      if (!res.ok) {
        setErrorMessage(json.message || `註冊失敗（${res.status}）`);
        return;
      }
      setSuccessMessage(
        json.message
          ? `${json.message}（Discord ID：${lookupState.discordId}）`
          : `註冊成功（Discord ID：${lookupState.discordId}）`,
      );
    } catch {
      setErrorMessage('網路錯誤，請稍後再試。');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                申辦帳號
              </Typography>
              <Typography variant="body2" color="text.secondary">
                邀請 ID：{invitationId}
              </Typography>
            </Box>

            {lookupState.status === 'loading' && (
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <CircularProgress size={18} />
                <Typography variant="body2" color="text.secondary">
                  正在驗證邀請資料...
                </Typography>
              </Stack>
            )}

            {lookupState.status === 'not-found' && (
              <Alert severity="error">找不到對應的邀請 ID，請確認連結是否正確。</Alert>
            )}

            {lookupState.status === 'ready' && (
              <>
                <Alert severity="info">已驗證成功，綁定 Discord ID：{lookupState.discordId}</Alert>

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="帳號名稱"
                      value={values.accountName}
                      onChange={handleChange('accountName')}
                      onBlur={handleBlur('accountName')}
                      error={touched.accountName && Boolean(accountNameError)}
                      helperText={touched.accountName ? accountNameError : '只能使用英文、數字、底線'}
                      fullWidth
                      required
                    />
                    <TextField
                      label="密碼"
                      type="password"
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && Boolean(passwordError)}
                      helperText={touched.password ? passwordError : '僅英文與數字，且長度需大於 10 碼'}
                      fullWidth
                      required
                    />
                    <TextField
                      label="確認密碼"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && Boolean(confirmPasswordError)}
                      helperText={touched.confirmPassword ? confirmPasswordError : '請再次輸入相同密碼'}
                      fullWidth
                      required
                    />
                    <Button type="submit" variant="contained">
                      送出申辦
                    </Button>
                  </Stack>
                </Box>
              </>
            )}

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

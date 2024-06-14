export function isValidUsername(username: string) {
  if (username.length < 4) return false;
  else return true;
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, at least one special character, and at least one uppercase letter
  const usernameRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return usernameRegex.test(password);
}

export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

import bcryptjs from "bcryptjs";
export const correctPassword = async function (
  candidatePassword,
  userpassword
) {
  // Check Password Is Correct??
  return await bcryptjs.compare(candidatePassword, userpassword);
};

export const mapUserData = async (user) => {
  const { uid, email, displayName: name, photoURL: avatar } = user;
  const token = await user.getIdToken(true);

  return {
    id: uid,
    email,
    token,
    avatar,
    name,
  };
};

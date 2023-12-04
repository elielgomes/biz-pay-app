export const formatAvatarString = (name?: string) => {
  if (name) {
    const nameArray = name.trim().split(' ');

    let avatar = "";
    for (const name of nameArray) {
      if (name.length > 0) {
        avatar += name[0];
      }
    }
    return avatar.slice(0, 2).toUpperCase();
  }
}
import { http } from "./api";

export async function updateProfilePicture(url: string) {
  const res = await http.patch("/users/me/profile-picture", {
    profilePictureUrl: url,
  });
  return res.data;
}

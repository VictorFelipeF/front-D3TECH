export interface MockUser {
  id: string;
  email: string;
  password: string;
  username: string;
  avatarUrl: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "admin@d3tec.com.br",
    password: "123456",
    username: "Hyude",
    avatarUrl: "",
  },
  {
    id: "2",
    email: "equipe@d3tec.com.br",
    password: "123456",
    username: "Equipe D3TECH",
    avatarUrl: "",
  },
];

import { prisma } from "../../back/lib/prisma"

export default async function Home() {
  const user = await prisma.user.findUnique({
    where: {
      email: "test@test.com",
    },
  });
  return (
    <div>hello, {user?.name}</div>
  );
}

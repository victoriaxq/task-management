import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Array de tarefas exemplo
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tarefasExemplo = [
    {
      title: "Desenvolver página inicial",
      description: "Criar layout responsivo da página inicial",
      status: Status.TO_DO,
    },
    {
      title: "Implementar autenticação",
      description: "Adicionar sistema de login com JWT",
      status: Status.IN_PROGRESS,
    },
    {
      title: "Escrever documentação",
      description: "Documentar APIs e componentes",
      status: Status.DONE,
    },
    // ... mais 12 tarefas aqui
  ];

  // Criar 15 tarefas
  for (let i = 0; i < 15; i++) {
    const status = [Status.TO_DO, Status.IN_PROGRESS, Status.DONE][
      Math.floor(Math.random() * 3)
    ];
    await prisma.task.create({
      data: {
        title: `Tarefa ${i + 1}`,
        description: `Descrição da tarefa ${i + 1}`,
        status: status,
      },
    });
  }

  console.log("Seed concluído: 15 tarefas foram criadas!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

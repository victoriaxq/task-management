import TaskPanel from "../components/TaskPanel";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-2">Odara Planner</h1>
      <h2 className="py-4 mb-4">
        clique{" "}
        <strong>
          <a
            href="https://dot-gerbera-706.notion.site/16d1a85a161080cf84eff42f04fcd076?v=16e1a85a161080a49838000c9f2fb3ca"
            className="font-semibold relative inline-block transition-transform duration-300 hover:scale-110 hover:700"
          >
            aqui
          </a>
        </strong>{" "}
        para saber um pouco mais sobre o planejamento do projeto :)
      </h2>
      <TaskPanel />
    </div>
  );
}

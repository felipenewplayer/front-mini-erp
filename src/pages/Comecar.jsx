import DivsDosConteudos from "../components/DivsDosConteudos";

export default function Comecar() {
  return (
    <DivsDosConteudos>
      <h2 className="text-light mb-3">Comece seu fluxo de trabalho:</h2>
      <ul className="text-light" style={{ lineHeight: 1.6 }}>
        <li>
          📝 Primeiro, faça seu cadastro com dados fictícios — eles serão salvos no <strong>localStorage</strong> do seu navegador.
        </li>
        <li>
          1️⃣ Em seguida, adicione um item no estoque acessando: <strong>Logística → Almoxarifado → Estoque</strong>.
        </li>
        <li>
          2️⃣ Depois, adicione um cliente clicando em <strong>Lista</strong> e depois em <strong>Adicionar</strong>.
        </li>
        <li>
          3️⃣ Por fim, vá até <strong>Vendas</strong> e crie um novo pedido.
        </li>
      </ul>
    </DivsDosConteudos>
  );
}

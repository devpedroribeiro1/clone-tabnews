import Image from "next/image";
import familyPhoto from "./imgs/familia.jpg";

function Home() {
  return (
    <>
      <h1
        style={{
          display: "inline-block",
          fontFamily: "cursive",
          backgroundColor: "#00ace2",
          color: "white",
          padding: 10,
          borderRadius: 7,
        }}
      >
        DevTeens
      </h1>
      <hr />
      <div style={{ fontFamily: "Arial", fontWeight: "500" }}>
        <p>
          Desde os nove anos estudo programação e, desde o início dos meus
          estudos, tive contato com poucos adolescentes ou jovens{" "}
          <strong>na minha faixa etária</strong> que estivessem à minha frente
          na programação. Isso não se deve à minha "
          <strong>super mega capacidade de programar</strong>", mas à falta de
          visibilidade e contato que <strong>jovens programadores</strong> têm
          dentro mercado de tecnologia e softwares.{" "}
          <strong>Programadores jovens existem</strong>, mas na maioria das
          vezes não conseguem se conectar e mostrar seu potencial ao mundo.{" "}
          <br />
          <br /> Por isso, eu, Pedro Ribeiro, estou criando um{" "}
          <strong>
            espaço na internet onde jovens programadores possam interagir
          </strong>
          . Um espaço na internet onde jovens possam aprender, ensinar e
          construir juntos. <br />
          <br /> Esse será um lugar para compartilhar conhecimentos, ideias,
          projetos, desafios, experiências e muito mais, ajudando jovens
          programadores a se
          <strong> conectarem</strong>, se <strong>destacarem</strong> e{" "}
          <strong>fortalecerem sua presença</strong> no universo da tecnologia.{" "}
          <br></br>
          <br></br>
          Dessa forma, programadores jovens irão surgir cada vez mais e, usando
          seus{" "}
          <strong style={{ textDecoration: "italic" }}>
            grandes potenciais
          </strong>{" "}
          - sua energia e seu tempo disponíveis - para construir softwares que
          facilitem a vida das pessoas. tornando o mundo, ou pelo menos uma
          pequena parte dele, um lugar melhor.
        </p>
      </div>
      <footer>
        <h3
          style={{
            fontFamily: "cursive",
            backgroundColor: "#00ace2",
            color: "white",
            padding: 10,
            borderRadius: 7,
          }}
        >
          Essa página é um registro da finalização da primeira milestone do
          projeto e foi criada em 20/12/2024. Nesse marco da história do
          DevTeens, deixo minha homenagem às pessoas mais importantes da minha
          vida:{" "}
        </h3>
      </footer>
      <Image
        src={familyPhoto}
        alt="Foto da minha Família"
        style={{
          maxWidth: "90%",
          height: "auto",
          borderRadius: 7,
          border: "5px solid #00ace2",
        }}
      />
    </>
  );
}

export default Home;

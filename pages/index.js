import Image from 'next/image';
import familyPhoto from './imgs/familia.jpg';

function Home() {
  return (
    <>
      <h1>DevTeens</h1>
      <h2>
        Eu, Dev Pedro Ribeiro, estou criando um espaço na internet onde Jovens Programadores podem ensinar, aprender, criar e se divertir juntos.
      </h2>
      <hr />
      <div>
        <details>
          <summary>Propósito</summary>
          <p>Conectar jovens que amam programação para aprender, ensinar, criar, se divertir e crescer juntos.</p>
        </details>
        <details>
          <summary>Buraco Tapado(como isso melhorará o mundo)</summary>
          <p>Potencializar a facilidade causada pela tecnologia no mundo, aproveitando o grande potencial dos jovens: sua energia e tempo disponíveis.</p>
        </details>
        <details>
          <summary>Postura do Usuário(quem utilizará esse espaço)</summary>
          <p> Todo Jovem Programador que possuir Vontade e Determinação para se tornar um profissional verdadeiramente competente.</p>
        </details>
      </div>
      <footer><h3>Essa página é um registro da finalização da primeira milestone do projeto e foi criada em 20/12/2024. Nesse marco da história do DevTeens, deixo minha homenagem às pessoas mais importantes da minha vida: </h3></footer>
      <Image 
        src={familyPhoto} 
        alt="Foto da minha Família" 
        style={{maxWidth: '90%', height: 'auto', borderRadius: 7}} 
      />
    </>
  );
}

export default Home;
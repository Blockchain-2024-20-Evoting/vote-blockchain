const VoteContract = artifacts.require("VoteContract");

contract("VoteContract", (accounts) => {
  let voteContract;

  const admin = accounts[0]; // Usamos la cuenta 0 para todas las pruebas
  const student1 = accounts[0]; // Usamos la cuenta 0 como estudiante también
  const electionId1 = 1;
  const electionId2 = 2;
  const candidateId1 = 1;
  const candidateId2 = 2;

  // Antes de cada prueba, desplegamos el contrato
  beforeEach(async () => {
    voteContract = await VoteContract.new({ from: admin });
  });

  // Test de que un voto se cuenta correctamente
  it("debería contar un voto para un candidato", async () => {
    // Votar por un candidato usando la cuenta 0 en la elección 1
    await voteContract.vote(electionId1, candidateId1, student1, { from: student1 });

    // Verificar el conteo de votos
    const voteCount = await voteContract.getVoteCount(electionId1, candidateId1);

    // El conteo de votos debe ser 1
    assert.equal(voteCount.toString(), "1", "El conteo de votos no es correcto");
  });

  // Test de que un votante no puede votar más de una vez en la misma elección
  it("no debería permitir que un estudiante vote más de una vez en la misma elección", async () => {
    // Votar por un candidato en la elección 1
    await voteContract.vote(electionId1, candidateId1, student1, { from: student1 });

    // Intentar votar de nuevo en la misma elección (debe fallar)
    try {
      await voteContract.vote(electionId1, candidateId1, student1, { from: student1 });
      assert.fail("El estudiante debería haber sido rechazado al intentar votar más de una vez en la misma elección");
    } catch (error) {
      assert(error.message.includes("Ya has votado en esta eleccion"), "El mensaje de error no es el esperado");
    }
  });

  // Test de que el conteo de votos aumenta correctamente por candidato y por elección diferente
  it("debería contar los votos para diferentes candidatos en diferentes elecciones", async () => {
    // Votar por el primer candidato en la elección 1
    await voteContract.vote(electionId1, candidateId1, student1, { from: student1 });

    // Votar por el segundo candidato en la elección 2
    await voteContract.vote(electionId2, candidateId2, student1, { from: student1 });

    // Verificar los conteos de votos en las diferentes elecciones
    const voteCount1 = await voteContract.getVoteCount(electionId1, candidateId1);
    const voteCount2 = await voteContract.getVoteCount(electionId2, candidateId2);

    // El primer candidato de la elección 1 debería tener 1 voto
    assert.equal(voteCount1.toString(), "1", "El conteo de votos del primer candidato en la elección 1 no es correcto");

    // El segundo candidato de la elección 2 debería tener 1 voto
    assert.equal(voteCount2.toString(), "1", "El conteo de votos del segundo candidato en la elección 2 no es correcto");
  });
});

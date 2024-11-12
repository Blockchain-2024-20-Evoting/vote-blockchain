const VoteContract = artifacts.require("VoteContract");

contract("VoteContract", (accounts) => {
  let voteInstance;
  const owner = accounts[0];
  const candidate = "Alice";

  beforeEach(async () => {
    voteInstance = await VoteContract.new({ from: owner });
  });

  it("debería desplegar el contrato y asignar el propietario correctamente", async () => {
    const contractOwner = await voteInstance.owner();
    assert.equal(contractOwner, owner, "El propietario debería ser el que desplegó el contrato.");
  });

  it("debería permitir al propietario votar por un candidato", async () => {
    await voteInstance.vote(candidate, { from: owner });
    const votes = await voteInstance.getVotes(candidate);
    assert.equal(votes.toNumber(), 1, "El candidato debería tener 1 voto.");
  });

  it("no debería permitir que otra cuenta vote", async () => {
    try {
      await voteInstance.vote(candidate, { from: accounts[1] });
      assert.fail("Debería fallar porque solo el propietario puede votar.");
    } catch (error) {
      assert.include(error.message, "No tienes permiso para realizar esta accion.", "El error debería incluir la restricción de solo propietario.");
    }
  });

  it("debería obtener el número correcto de votos de un candidato", async () => {
    await voteInstance.vote(candidate, { from: owner });
    await voteInstance.vote(candidate, { from: owner });
    const votes = await voteInstance.getVotes(candidate);
    assert.equal(votes.toNumber(), 2, "El candidato debería tener 2 votos.");
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract VoteContract {
    // Mapeo de si un votante ya ha votado en una elección
    mapping(uint256 => mapping(uint256 => bool)) private hasVoted; // electionId -> studentId -> hasVoted
    // Mapeo de conteo de votos por candidato en cada elección
    mapping(uint256 => mapping(uint256 => uint256)) private voteCounts; // electionId -> candidateId -> voteCount
    // Mapeo de si la elección está activa o no

    // Dirección del administrador (la cuenta que despliega el contrato)
    address public admin;

    // Eventos
    event VoteCast(uint256 electionId, uint256 candidateId, uint256 studentId);

    // Modificadores
    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Solo el administrador puede ejecutar esta funcion"
        );
        _;
    }

    // Constructor que establece la dirección del administrador
    constructor() {
        admin = msg.sender;
    }

    // Función para votar en una elección
    function vote(
        uint256 electionId,
        uint256 candidateId,
        uint256 studentId
    ) public onlyAdmin{
        // Verificar que el votante no haya votado aún
        require(!hasVoted[electionId][studentId], "Ya has votado en esta eleccion");

        // Marcar que este votante ya ha votado en esta elección
        hasVoted[electionId][studentId] = true;
        // Incrementar el conteo de votos del candidato en la elección
        voteCounts[electionId][candidateId]++;

        // Emitir un evento de voto
        emit VoteCast(electionId, candidateId, studentId);
    }

    // Función para obtener el conteo de votos de un candidato en una elección
    function getVoteCount(uint256 electionId, uint256 candidateId)
        public
        view
        returns (uint256)
     {
        return voteCounts[electionId][candidateId];
    }

  // Función para validar si un estudiante ya votó en una elección
    function hasStudentVoted(uint256 electionId, uint256 studentId)
        public
        view
        returns (bool)
    {
        return hasVoted[electionId][studentId];
    }

}

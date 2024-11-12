// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VoteContract {
    address public owner; // Variable para almacenar la dirección del propietario
    mapping(address => bool) public hasVoted;
    mapping(string => uint) public votes;

    // Modificador que restringe el acceso a solo el propietario
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "No tienes permiso para realizar esta accion."
        );
        _;
    }

    // Constructor que asigna la cuenta que despliega el contrato como owner
    constructor() {
        owner = msg.sender;
    }

    // Función para votar, accesible solo para el propietario
    function vote(string memory candidate) public onlyOwner {
        votes[candidate]++;
    }

    // Función para obtener los votos de un candidato
    function getVotes(string memory candidate) public view returns (uint) {
        return votes[candidate];
    }

    // Función para obtener la dirección del creador del contrato
    function getCreator() public view returns (address) {
        return owner;
    }

    // Función para retirar la propiedad (opcional)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Direccion invalida.");
        owner = newOwner;
    }
}

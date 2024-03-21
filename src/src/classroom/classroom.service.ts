// Importa decoradores e entidade de sala de aula
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class ClassroomService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
      ) {}

  /**
   * Registra uma nova turma com base nos dados fornecidos. Este método aceita um objeto `ClassroomDTO`
   * que contém todas as informações necessárias para o cadastro de uma turma. Um novo `id` é gerado automaticamente para a turma com base no número de turmas já registrados.
   * 
   * Após a criação, a turma é adicionado a um array interno que simula um banco de dados de estudantes. O método
   * então retorna o objeto `classroom` do estudante recém-registrado, incluindo seu `id` gerado.
   * 
   * @param {number} workshopid - O id da oficina atrelada a essa turma.
   * @param {string} name - O nome completo da turma.
   * @param {number} day - O dia que essa turma se encontrará.
   * @param {string} starttime - O horário de início da turma.
   * @param {string} endtime - O horário de fim da turma.
   * 
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do estudante
   * recém-registrado, incluindo seu identificador único e todas as informações fornecidas.
  */
  async register(workshopid: number, name: string, day: number, starttime: string, endtime: string) {
    const query = `INSERT INTO "classroom" (
      "workshopid",
      "name", 
      "day", 
      "starttime", 
      "endtime" 
  ) VALUES (
      $1,  
      $2,  
      $3,  
      $4, 
      $5
  ) RETURNING *;`
  console.log([workshopid, name, day, starttime, endtime]);
  
    const result = await this.entityManager.query(query, [workshopid, name, day, starttime, endtime]);
    return result;
  }

}

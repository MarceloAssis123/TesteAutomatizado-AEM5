// Importa a entidade de presença
import { PresenceEntity } from "../presence/presence.entity";

// Entidade que representa a aula
export class ClassEntity {
    idClass: number;
    idClassroom: number;
    dateTime: string;
    idTeacher: number;
    presence: PresenceEntity[];
    absent: PresenceEntity[];
}
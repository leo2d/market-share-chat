import BaseEntity from '../../shared/entities/baseEntity';

export default class Room extends BaseEntity {
  name: string;
  createdByUserId: string;
}

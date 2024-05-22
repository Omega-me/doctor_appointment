import { appointment } from '@prisma/client';
import { CustomerInfoDTO, DoctorInfoDTO } from './UserDTO';

export interface AppointmentDTO extends appointment {
  customer_info: CustomerInfoDTO;
  doctor_info?: DoctorInfoDTO;
}
export interface CreateAppointmentDTO extends Omit<AppointmentDTO, 'id' | 'customer_info' | 'doctor_info'> {}
export interface UpdateAppointmentDTO extends Partial<Omit<CreateAppointmentDTO, 'customerinfo_id', 'doctorinfo_id'>> {}

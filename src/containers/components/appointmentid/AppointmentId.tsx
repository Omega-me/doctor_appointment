'use client';
import { memo } from 'react';
import s from './appointmentid.module.scss';
  
interface AppointmentIdProps {}
  
const AppointmentId: React.FC<AppointmentIdProps> = props => {
  return <div className={s.appointmentid}>AppointmentId</div>;
};
  
export default memo(AppointmentId);
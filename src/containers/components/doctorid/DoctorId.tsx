'use client';
import { memo } from 'react';
import s from './doctorid.module.scss';
  
interface DoctorIdProps {}
  
const DoctorId: React.FC<DoctorIdProps> = props => {
  return <div className={s.doctorid}>DoctorId</div>;
};
  
export default memo(DoctorId);
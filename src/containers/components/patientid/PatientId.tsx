'use client';
import { memo } from 'react';
import s from './patientid.module.scss';

interface PatientIdProps {}

const PatientId: React.FC<PatientIdProps> = props => {
  return <div className={s.pattientid}>PattientId</div>;
};

export default memo(PatientId);

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  // eslint-disable-next-line prettier/prettier
  constructor(private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

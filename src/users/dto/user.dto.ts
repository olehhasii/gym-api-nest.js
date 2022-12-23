import { UserParametersDto } from './userParameters.dto';

export class UserDto {
  id: string;
  email: string;
  username: string;
  parameters?: UserParametersDto;
}

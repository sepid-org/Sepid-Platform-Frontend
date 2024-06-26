import {
  ProgramType, 
  Invitation, 
  RegistrationReceiptType, 
  Widget, 
  Team, 
  Request, 
  RegistrationFormType,
  Merchandise, 
  UploadedFile,
  FSMType
} from '../models'

export type InitialState = {
  isFetching: boolean,
  workshops: FSMType[],
  workshopsCount: number,
  programs: ProgramType[],
  program: ProgramType,
  uploadedFile: UploadedFile,
  myInvitations: Invitation[],
  teamInvitations: Invitation[],
  allRegistrationReceipts: RegistrationReceiptType[],
  registrationReceipt: RegistrationReceiptType,
  widgets: Widget,
  allProgramTeams: Team[],
  teamsRequests: object,
  myWorkshops: FSMType[],
  registrationForm: RegistrationFormType,
  merchandise: Merchandise,
  discountedPrice: Number,
  team: Team,
  certificateLink: String,
  playerId: Object,
  teamCurrentState: { uuid: string, paperId: string, currentStateName: string, teamEnterTimeToState: string },
};


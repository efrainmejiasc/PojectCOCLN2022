export interface UserCas{
  casId:number,
  casToken:string,
  country:string,
  countryCode:string,
  email:string,
  fullName:string,
  id:number,
  isAdmin:boolean,
  token:string
}

export interface IcasResponse{
  message: string,
  succeeded: boolean,
  errors: string[],
  data: any;
}

export interface ICasUrl {
  url: string,
  id: string
}
